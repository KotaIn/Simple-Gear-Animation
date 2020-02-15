main();

///////////////////
// Using these Gears
// doanGear, 
// michaelfultonGear, 
// inoueGear, 
// mjostenGear,
// kimGear
////////////////////
function main() {

  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl', {antialias: true}  );

  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }


  var angle_x = 0;
  var angle_y = 0;
  var angle_z = 0;
  var neg_angle_z = 0;
  var gear_id = 0;

  var t = 0;
  var speed = 1;


  // Vertex shader program, runs on GPU, once per vertex

  const vsSource = `
  // Vertex Shader
  precision mediump int;
  precision mediump float;

  // Scene transformations
  uniform mat4 u_PVM_transform; // Projection, view, model transform
  uniform mat4 u_VM_transform;  // View, model transform

  // Light model
  uniform vec3 u_Light_position;
  uniform vec3 u_Light_color;
  uniform float u_Shininess;
  uniform vec3 u_Ambient_color;

  uniform float u_t;////////////////////////////////////////////


  // Original model data
  attribute vec3 a_Vertex;
  attribute vec3 a_Color;
  attribute vec3 a_Vertex_normal;

  // Data (to be interpolated) that is passed on to the fragment shader
  varying vec3 v_Vertex;
  varying vec4 v_Color;
  varying vec3 v_Normal;

  void main() {

    // Perform the model and view transformations on the vertex and pass this
    // location to the fragment shader.
    v_Vertex = vec3( u_VM_transform * vec4(a_Vertex, 1.0) );

    // Perform the model and view transformations on the vertex's normal vector
    // and pass this normal vector to the fragment shader.
    v_Normal = vec3( u_VM_transform * vec4(a_Vertex_normal, 0.0) );

    // Pass the vertex's color to the fragment shader.
    v_Color = vec4(a_Color, 1.0);

    // Transform the location of the vertex for the rest of the graphics pipeline
    gl_Position = u_PVM_transform * vec4(a_Vertex, 1.0);
  }
  `;

  // Fragment shader program, runs on GPU, once per potential pixel

  const fsSource = `
  // Fragment shader program
  precision mediump int;
  precision mediump float;

  // Light model
  uniform vec3 u_Light_position;
  uniform vec3 u_Light_color;
  uniform float u_Shininess;
  uniform vec3 u_Ambient_color;

  uniform float u_t;////////////////////////////////////////////

  // Data coming from the vertex shader
  varying vec3 v_Vertex;
  varying vec4 v_Color;
  varying vec3 v_Normal;

  void main() {

    vec3 to_light;
    vec3 vertex_normal;
    vec3 reflection;
    vec3 to_camera;
    float cos_angle;
    vec3 diffuse_color;
    vec3 specular_color;
    vec3 ambient_color;
    vec3 color;

    // Calculate the ambient color as a percentage of the surface color
    ambient_color = u_Ambient_color * vec3(v_Color);

    // Calculate a vector from the fragment location to the light source
    to_light = u_Light_position - v_Vertex;
    to_light = normalize( to_light );

    // The vertex's normal vector is being interpolated across the primitive
    // which can make it un-normalized. So normalize the vertex's normal vector.
    vertex_normal = normalize( v_Normal );

    // Calculate the cosine of the angle between the vertex's normal vector
    // and the vector going to the light.
    cos_angle = dot(vertex_normal, to_light);
    cos_angle = clamp(cos_angle, 0.0, 1.0);

    // Scale the color of this fragment based on its angle to the light.
    diffuse_color = vec3(v_Color) * cos_angle;

    // Calculate the reflection vector
    reflection = 2.0 * dot(vertex_normal,to_light) * vertex_normal - to_light;

    // Calculate a vector from the fragment location to the camera.
    // The camera is at the origin, so negating the vertex location gives the vector
    to_camera = -1.0 * v_Vertex;

    // Calculate the cosine of the angle between the reflection vector
    // and the vector going to the camera.
    reflection = normalize( reflection );
    to_camera = normalize( to_camera );
    cos_angle = dot(reflection, to_camera);
    cos_angle = clamp(cos_angle, 0.0, 1.0);
    cos_angle = pow(cos_angle, u_Shininess);

    // The specular color is from the light source, not the object
    if (cos_angle > 0.0) {
      specular_color = u_Light_color * cos_angle;
      diffuse_color = diffuse_color * (1.0 - cos_angle);
    } else {
      specular_color = vec3(0.0, 0.0, 0.0);
    }

    color = ambient_color + diffuse_color + specular_color;
    color*= u_t;

    gl_FragColor = vec4(color, v_Color.a);
  }
  `;

  // Initialize a shader program; this is where all
  // the lighting for the objects, if any, is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Tell WebGL to use our program when drawing
  gl.useProgram(shaderProgram);

  // Collect all the info needed to use the shader program.
  // Look up locations of attributes and uniforms used by
  // our shader program
  const programInfo = {
    program: shaderProgram,
    locations: {
      a_vertex: gl.getAttribLocation(shaderProgram, 'a_Vertex'),
      a_color: gl.getAttribLocation(shaderProgram, 'a_Color'),
      a_normal: gl.getAttribLocation(shaderProgram, 'a_Vertex_normal'),
      u_light_dir: gl.getUniformLocation(shaderProgram, 'u_Light_position'),
	  u_light_color: gl.getUniformLocation(shaderProgram, 'u_Light_color'),
	  u_shininess: gl.getUniformLocation(shaderProgram, 'u_Shininess'),
	  u_ambient_color: gl.getUniformLocation(shaderProgram, 'u_Ambient_color'),
	  u_PVM_transform: gl.getUniformLocation(shaderProgram, 'u_PVM_transform'),
	  u_VM_transform: gl.getUniformLocation(shaderProgram, 'u_VM_transform'),
	  time: gl.getUniformLocation(shaderProgram, 'u_t'),

    },
  };

  // add an event handler so we can interactively rotate the model
  document.addEventListener('keydown',

      function key_event(event) {

         if(event.keyCode == 37) {   //left
             angle_y -= 3;
         } else if(event.keyCode == 38) {  //top
             angle_x -= 3;
         } else if(event.keyCode == 39) {  //right
             angle_y += 3;
         } else if(event.keyCode == 40) {  //bottom
             angle_x += 3;
         } else if(event.keyCode == 83) {  //bottom
             speed/=2;
         } else if(event.keyCode == 70) {  //bottom
             speed*=2;
         } 

         drawScene(gl, programInfo, buffersCollections, angle_z, neg_angle_z, t);
         return false;
      })


  // build the object(s) we'll be drawing, put the data in buffers
  var buffers1 = initBuffers(gl,programInfo,gear_id + 5);
  var buffers2 = initBuffers(gl,programInfo,gear_id + 6);
  var buffers3 = initBuffers(gl,programInfo,gear_id + 7);
  var buffers4 = initBuffers(gl,programInfo,gear_id + 8);
  var buffers5 = initBuffers(gl,programInfo,gear_id + 9);



  buffersCollections = {}
  buffersCollections.gear1 = buffers1
  buffersCollections.gear2 = buffers2
  buffersCollections.gear3 = buffers3
  buffersCollections.gear4 = buffers4
  buffersCollections.gear5 = buffers5
  

//   enableAttributes(gl,buffers,programInfo)

  // Draw the scene
  self.animate = function(){
    angle_z+=1;
    neg_angle_z -= 1;
    // Draw the scene
     t+=speed;

   if (t >  1000)
       t = 0;  
   drawScene(gl, programInfo, buffersCollections, angle_z, neg_angle_z, t);
  requestAnimationFrame(self.animate)
  }
  animate();
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl,programInfo,gear_id) {

  switch(gear_id) {


  case 0:
    gearData = ArmoniAthertonGear(30, 30);
    break;
    
  case 1:
    gearData = joshAthertonGear(40, 20);
    break;

  case 2:
    var gearInfo = {
       numTeeth:30,
       numSpokes:12
    };
    gearData = beveridgeGear(gearInfo.numTeeth, gearInfo.numSpokes);
    break;

  case 3:
    gearData = brendelGear(30, 6, 0.3); //20 Teeth, 5 Spokes, 0.1 Width.
    break;

  case 4:
    gearData = cannonGear(30, 10);
    break; 

  case 5:
    gearData = doanGear(40,5);
    break;

  case 6:
    gearData = michaelfultonGear(40, 4);
    break; 

  case 7:
    gearData = inoueGear();
    break; 

  case 8:
    gearData = mjostenGear(20, 4);
    break; 

  case 9:
    gearData = kimGear(40,6);
    break; 

  case 10:
    gearData = kuduvaGear(20, 10);
    break; 

  case 11:
    gearData = evandlGear(40, 4, 0.5);
    break; 

  case 12:
    gearData = marcusGear(16,8);
    break; 

  case 13:
    gearData = createBMathewGear(30, 8, 70, 70, 85, 95, 5, 5, 5, 218 / 255, 165 / 255, 32 / 255);  
    break; 

  case 14:
    gearData = millerGear(20, 8);  
    break; 

  case 15:
    gearData = anhnguyenGear(20,8);  
    break; 

  case 16:
    gearData = osbornemGear(10, 10);  
    break; 

  case 17:
    // numberOfTeeth, numberOfSpokes, circlizer, spokeFraction, spokeZFatness,smallCoinFactor, red, green, blue
    gearData = createOxfordGear(20, 10, 1, 7, 5, .25, 75,0,130);  
    break; 

  case 18:
    gearData = perezGear(20, 20);  
    break; 

  case 19:
    gearData = createtommypGear();
    break; 

  case 20:
    const METAL_GEAR = {
      toothCount: 16,
      spokeCount: 16,
      r1: 0.15,
      r2: 0.32,
      spokeRad: 0.03,
      outerThickness: .1,
      innerThickness: .06,
      teethHeight: .1,
      outerColor: METAL0,
      innerColor: METAL1,
      toothOuterColor: METAL3,
      toothInnerColor: METAL2,
      dullness: 4,
    };
    gearData = scottGear(METAL_GEAR);
    break; 

  case 21:
    let numTeeth = 40;
    let numSpokes = 13;
    let teethSlant = 4;
    let centerRadius = 0.3;
    let outerWidth = 0.2;
    gearData = nathanRuesGear(numTeeth, numSpokes, teethSlant, centerRadius, outerWidth);  
    break; 

  case 22:
    gearData = tarabiGear(20, 10);
    break; 

  case 23:
    gearData = tovarGear(30, 4);   
    break; 

  case 24:
    gearData = createAllenT94Gear(40, 10);  
    break; 

  case 25:
    gearData = jenzelVillanuevaGear(20,5);
    break; 

  case 26:
    gearData = walshGear(25, 7, 1.15, 3.5);   
    break; 

  case 27:
    gearData = jakeYangGear(20, 30);
    break; 

  case 28:
    gearData = yuenGear(30, 20);
    break;  

  }

  const vertices = gearData[0];
  const colors = gearData[1];
  const normals = gearData[2];

  // Create  buffers for the object's vertex positions
  const vertexBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Now pass the list of vertices to the GPU to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(vertices),
                gl.STATIC_DRAW);


  // do likewise for colors
  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(colors),
                gl.STATIC_DRAW);


const normalBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(normals),
                gl.STATIC_DRAW);

  return {
    // each vertex in buffer has 3 floats
    num_vertices: vertices.length / 3,
    vertex: vertexBuffer,
    color: colorBuffer,
    normal: normalBuffer
  };

}



function enableAttributes(gl,buffers,programInfo) {

    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

  // Tell WebGL how to pull vertex positions from the vertex
  // buffer. These positions will be fed into the shader program's
  // "a_vertex" attribute.

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.locations.a_vertex,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_vertex);


    // likewise connect the colors buffer to the "a_color" attribute
    // in the shader program
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.locations.a_color,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_color);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.locations.a_normal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_normal);

}


//
// Draw the scene.
//
function drawScene(gl, programInfo, buffersCollections, angle_z, neg_angle_z, t) {
  gl.clearColor(0, 0, 0, 0);  // Clear to white, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  //make transform to implement interactive rotation

  var matrix = new Learn_webgl_matrix();

  var rotate_x_matrix = matrix.create();
  var rotate_y_matrix = matrix.create();
  var rotate_z_matrix = matrix.create();
  var rotate_neg_z_matrix = matrix.create();

  var lookat = matrix.create();
  var u_PVMtransform = matrix.create();
  var u_VMtransform = matrix.create();
  var scale = matrix.create();
  var proj = matrix.createFrustum(-1,1,-1,1,3,1000);
//   matrix.scale(scale,0.8,0.8,0.8);
  matrix.lookAt(lookat, 0,0,30, 0,0,0, 0,1,0);
  matrix.rotate(rotate_x_matrix, -90, 1, 0, 0);
  matrix.rotate(rotate_y_matrix, -90, 0, 1, 0);
  matrix.rotate(rotate_z_matrix, angle_z, 0, 0, 1);
  matrix.rotate(rotate_neg_z_matrix, neg_angle_z, 0, 0, 1);

  var camera_location = [0,0,0];

  var control_points = [
                         [  -20.0, -20.0,   -5.0],
                         [ 0.0, - 6.0,   -3.0],
                         [ 18.0, - 4.0, 20.0],
                         [ 20.0,  -2.0, 30.0], 
                         [ 30.0,  -1.0, 40.0],    
                         [ 20.0,  7.0, 22.0],
                         [ 10.0,  17.0,   25.0],
                         [ 14.0,  20.0,   28.0], 
                         [  25.0,   28.0,   40.0], 
                         [  30.0,   39.0,   30.0],                                                                        
                       ];


  gl.uniform3f(programInfo.locations.u_light_dir, 3, 3, 3);

  gl.uniform3f(programInfo.locations.u_light_color, 1, 1, 1);
  gl.uniform1f(programInfo.locations.u_shininess, 85);
  gl.uniform3f(programInfo.locations.u_ambient_color, 0.01, 0.01, 0.01);

  var c_t =  t/500;
  if(c_t > 1) 
  c_t = 1;
  /////////////////////////////////////////
  gl.uniform1f(programInfo.locations.time, c_t);
  //////////////////////////////////////////////////

   // t/1000.0
   var cp;

  //y = (1 − t)3, green: y= 3(1 − t)2 t, red: y= 3(1 − t) t2, and cyan: y = t3

   function weight(t) {
//        return [  Math.pow(1-t,3), 3*Math.pow(1-t,2)*t, 3*(1-t)*Math.pow(t,2), Math.pow(t,3) ];
    return [    Math.pow(1-t,10),                10*Math.pow(1-t,9) *t, 
             45*Math.pow(1- t,8)*Math.pow(t,2), 120*Math.pow(1- t,7)*Math.pow(t,3),
            210*Math.pow(1- t,6)*Math.pow(t,6), 252*Math.pow(1- t,5)*Math.pow(t,5),
            210*Math.pow(1- t,4)*Math.pow(t,2), 120*Math.pow(1- t,3)*Math.pow(t,7),
             45*Math.pow(1- t,2)*Math.pow(t,8),  10*(1-t)           *Math.pow(t,9),
             Math.pow(t,10)];
   }

   weights = weight(t/1000);
   
   for (cp = 0; cp < 4; cp++ ) {
         
         camera_location[0] += weights[cp] * control_points[cp][0];
         camera_location[1] += weights[cp] * control_points[cp][1];
         camera_location[2] += weights[cp] * control_points[cp][2];

   } 

  matrix.lookAt(lookat,
               // 5*Math.cos( t*Math.PI/180),0,5*Math.sin( t*Math.PI/180), 
                camera_location[0], camera_location[1], camera_location[2],
                0,0,0, 
                0,1,0);

  ////////////////////////////////Gear1
  matrix.scale(scale,2.8,2.8,1);
  var buffers = buffersCollections.gear1;
  enableAttributes(gl,buffers,programInfo)///////////////////////////////////

  var translate = matrix.create();
  matrix.translate(translate, -6.5, -2.7, -2);

  // Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        translate,rotate_neg_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        translate,rotate_neg_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers.num_vertices);
  }



  ////////////////////////////////Gear2
  matrix.scale(scale,2.8,2.8,2.8);
  var buffers2 = buffersCollections.gear2;
  enableAttributes(gl,buffers2,programInfo)///////////////////////////////////
  translate = matrix.create();
  matrix.translate(translate, 2, 3.34, -2.0);

// Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        translate,rotate_neg_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        translate,rotate_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers2.num_vertices);
  }


   ////////////////////////////////Gear3
     matrix.rotate(rotate_z_matrix, angle_z, 0, 0, 1);

  var buffers3 = buffersCollections.gear3;
  enableAttributes(gl,buffers3,programInfo)///////////////////////////////////
  translate = matrix.create();
  matrix.translate(translate, -4.5, 3.34, -2.0);

// Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        translate,rotate_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        translate,rotate_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers3.num_vertices);
  }
  

  ////////////////////////////////Gear4
  matrix.scale(scale,2.8,2.8,2.8);


  var buffers4 = buffersCollections.gear4;
  enableAttributes(gl,buffers4,programInfo)///////////////////////////////////
  translate = matrix.create();
  matrix.translate(translate, 0, -2.7, -2.0);

// Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        translate,rotate_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        translate,rotate_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers4.num_vertices);
  }


  ////////////////////////////////Gear5

  matrix.rotate(rotate_y_matrix, 90, 0, 1, 0);

  var buffers5 = buffersCollections.gear5;
  enableAttributes(gl,buffers5,programInfo)///////////////////////////////////
  translate = matrix.create();
  matrix.translate(translate, -1.0, 2.8, 5.3);

// Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        rotate_y_matrix, translate,rotate_neg_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        rotate_y_matrix, translate,rotate_neg_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers5.num_vertices);
  }

  ////////////////////////////////Gear6
  matrix.scale(scale,2.8,2.8,1);
  var buffers6 = buffersCollections.gear1;
  enableAttributes(gl,buffers6,programInfo)///////////////////////////////////

  var translate = matrix.create();
  matrix.translate(translate, -4.5, 3.8, 4.3);

  // Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        translate,rotate_neg_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        translate,rotate_neg_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers6.num_vertices);
  }



  ////////////////////////////////Gear7
  var buffers7 = buffersCollections.gear2;
  enableAttributes(gl,buffers7,programInfo)///////////////////////////////////
  translate = matrix.create();
  matrix.translate(translate, 2, 3.8, 4.3);

// Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        translate,rotate_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        translate,rotate_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers7.num_vertices);
  }




  ////////////////////////////////Gear10

  matrix.rotate(rotate_y_matrix, 90, 0, 1, 0);

  var buffers10 = buffersCollections.gear5;
  enableAttributes(gl,buffers5,programInfo)///////////////////////////////////
  translate = matrix.create();
  matrix.translate(translate, -1.2, 4.3, -7.5);

// Combine the two rotations into a single transformation
  matrix.multiplySeries(u_PVMtransform, proj, lookat,
        rotate_y_matrix, translate,rotate_neg_z_matrix, scale);
  matrix.multiplySeries(u_VMtransform, lookat,
        rotate_y_matrix, translate,rotate_neg_z_matrix, scale);


  // Set the shader program's uniform
  gl.uniformMatrix4fv(programInfo.locations.u_PVM_transform, false, u_PVMtransform);
  gl.uniformMatrix4fv(programInfo.locations.u_VM_transform, false, u_VMtransform);
  
  { // now tell the shader (GPU program) to draw some triangles
    const offset = 0;
    gl.drawArrays(gl.TRIANGLES, offset, buffers10.num_vertices);
  }


  
}

//
// Initialize a shader program, so WebGL knows how to draw our data
// BOILERPLATE CODE, COPY AND PASTE
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.  BOILERPLATE CODE, COPY AND PASTE
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}




