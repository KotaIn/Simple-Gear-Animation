//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function jakeYangGear(numTeeth, numSpokes) {
  const vertices = [];
  const colors = [];
  const normals = [];

////////////////////////////
// Making gear triangles
  
  var n = numTeeth * 2;
  var numSpokes = numSpokes;
  var rad = 1.0;
  var outRad = rad * 1.2;
  var angInc = 2*3.14159/n;
  var spokesAngInc = 3.14159/numSpokes;
  var ang = 0;
  var z = 0.1;
  var i;    

  var centerRadius = 0.3;
  var wheelRadius = 0.835;
  var teethAngle = 0.5;

  // CENTER
  var r;
  for (r = 0; r < 2; r++) {
    ang = 0;
    for (i = 0; i < n; i++) {

      vertices.push(0,0,z,
        rad*Math.cos(ang) * centerRadius,rad*Math.sin(ang) * centerRadius,z,
        rad*Math.cos(ang+angInc) * centerRadius,rad*Math.sin(ang+angInc) * centerRadius,z);

      colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      //colors.push( 1,0,0,  0,1,0,  0,0,1);
      if (z > 0)
          normals.push(0,0,1, 0,0,1, 0,0,1  );    
      else
          normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    
      ang += angInc;
    }
    z = -z;
  }

  // CENTER EDGE
  ang = 0;          
  for (i = 0; i < n; i++) {
    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];

    vertices.push(
      rad*Math.cos(ang) * centerRadius,rad*Math.sin(ang) * centerRadius,-z,
      rad*Math.cos(ang+angInc) * centerRadius,rad*Math.sin(ang+angInc) * centerRadius,-z,
      rad*Math.cos(ang+angInc) * centerRadius,rad*Math.sin(ang+angInc) * centerRadius,z);

    colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

    vertices.push(
      rad*Math.cos(ang) * centerRadius,rad*Math.sin(ang) * centerRadius,-z,
      rad*Math.cos(ang+angInc) * centerRadius,rad*Math.sin(ang+angInc) * centerRadius,z,
      rad*Math.cos(ang) * centerRadius,rad*Math.sin(ang) * centerRadius,z);

    colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

    ang += angInc;
  }

// SPOKES
  for (r = 0; r < 2; r++) {
    ang = 0;
    for (i = 0; i < numSpokes; i++) {

      var mat = new Learn_webgl_matrix();
      var rotateMat =  mat.create();
      mat.rotate(rotateMat, 180, 0,1,0);

      var vec4 = new Learn_webgl_point4();
      var v1 = vec4.create(0,0,z);
      var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
      var v3 = vec4.create(rad*Math.cos(ang+spokesAngInc),rad*Math.sin(ang+spokesAngInc),z);

      var newV1 = vec4.create();   
      mat.multiplyP4(newV1,rotateMat,v1);

      var newV2 = vec4.create();   
      mat.multiplyP4(newV2,rotateMat,v2);

      var newV3 = vec4.create();   
      mat.multiplyP4(newV3,rotateMat,v3);                  

      vertices.push(  newV1[0], newV1[1], newV1[2],  
                      newV2[0], newV2[1], newV2[2],          
                      newV3[0], newV3[1], newV3[2]                              
      );

      colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      /// AND WE COULD HAVE ROTATED THE NORMALS
      if (z < 0)
          normals.push(0,0,1, 0,0,1, 0,0,1  );    
      else
          normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    
      ang += spokesAngInc + spokesAngInc;
    }   
    z = -z;
  }


  // // SPOKE EDGES
    for (r = 0; r < 2; r++) {
      ang = 0;
      for (i = 0; i < numSpokes; i++) {

        var mat = new Learn_webgl_matrix();
        var rotateMat =  mat.create();
        mat.rotate(rotateMat, 180, 0,1,0);

        var vec4 = new Learn_webgl_point4();

        var v1 = vec4.create(0, 0, -z);
        var v2 = vec4.create(outRad*Math.cos(ang) * wheelRadius,outRad*Math.sin(ang) * wheelRadius,-z);
        var v3 = vec4.create(outRad*Math.cos(ang) * wheelRadius,outRad*Math.sin(ang) * wheelRadius,z);

        var newV1 = vec4.create();   
        mat.multiplyP4(newV1,rotateMat,v1);

        var newV2 = vec4.create();   
        mat.multiplyP4(newV2,rotateMat,v2);

        var newV3 = vec4.create();   
        mat.multiplyP4(newV3,rotateMat,v3);

        var normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),z);

        vertices.push(  newV1[0], newV1[1], newV1[2],  
                        newV2[0], newV2[1], newV2[2],          
                        newV3[0], newV3[1], newV3[2]                              
        );

        // colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);


        v1 = vec4.create(0, 0, -z);
        v2 = vec4.create(outRad*Math.cos(ang) * wheelRadius,outRad*Math.sin(ang) * wheelRadius,z);
        v3 = vec4.create(0, 0, z);

        newV1 = vec4.create();   
        mat.multiplyP4(newV1,rotateMat,v1);

        newV2 = vec4.create();   
        mat.multiplyP4(newV2,rotateMat,v2);

        newV3 = vec4.create();   
        mat.multiplyP4(newV3,rotateMat,v3);    

        normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),z);

        vertices.push(  newV1[0], newV1[1], newV1[2],  
                        newV2[0], newV2[1], newV2[2],          
                        newV3[0], newV3[1], newV3[2]                              
        );

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

        v1 = vec4.create(0, 0, z);
        v2 = vec4.create(outRad*Math.cos(ang+spokesAngInc) * wheelRadius,outRad*Math.sin(ang+spokesAngInc) * wheelRadius,z);
        v3 = vec4.create(outRad*Math.cos(ang+spokesAngInc) * wheelRadius,outRad*Math.sin(ang+spokesAngInc) * wheelRadius,-z);

        newV1 = vec4.create();   
        mat.multiplyP4(newV1,rotateMat,v1);

        newV2 = vec4.create();   
        mat.multiplyP4(newV2,rotateMat,v2);

        newV3 = vec4.create();   
        mat.multiplyP4(newV3,rotateMat,v3);    

        normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),z);

        vertices.push(  newV1[0], newV1[1], newV1[2],  
                        newV2[0], newV2[1], newV2[2],          
                        newV3[0], newV3[1], newV3[2]                              
        );

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);       

        v1 = vec4.create(0, 0, -z);
        v2 = vec4.create(outRad*Math.cos(ang+spokesAngInc) * wheelRadius,outRad*Math.sin(ang+spokesAngInc) * wheelRadius,-z);
        v3 = vec4.create(0, 0, z);

        newV1 = vec4.create();   
        mat.multiplyP4(newV1,rotateMat,v1);

        newV2 = vec4.create();   
        mat.multiplyP4(newV2,rotateMat,v2);

        newV3 = vec4.create();   
        mat.multiplyP4(newV3,rotateMat,v3);    

        normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
          outRad*Math.cos(ang),outRad*Math.sin(ang),z);

        vertices.push(  newV1[0], newV1[1], newV1[2],  
                        newV2[0], newV2[1], newV2[2],          
                        newV3[0], newV3[1], newV3[2]                              
        );

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

        ang += spokesAngInc + spokesAngInc;
      }
    }  

  // WHEEL
  var r;
  for (r = 0; r < 2; r++) {
    ang = 0;

    for ( i = 0; i < n; i++) {

      vertices.push(rad*Math.cos(ang) * wheelRadius, rad*Math.sin(ang) * wheelRadius, z,
                   rad*Math.cos(ang+angInc) * wheelRadius, rad*Math.sin(ang+angInc) * wheelRadius, z,
                   outRad*Math.cos(ang+angInc) * wheelRadius, outRad*Math.sin(ang+angInc) * wheelRadius, z)

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);

      if (z > 0)
          normals.push(0,0,1, 0,0,1, 0,0,1  );    
      else
          normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

      vertices.push(rad*Math.cos(ang) * wheelRadius, rad*Math.sin(ang) * wheelRadius, z,
                   outRad*Math.cos(ang+angInc) * wheelRadius, outRad*Math.sin(ang+angInc) * wheelRadius, z,
                   outRad*Math.cos(ang) * wheelRadius, outRad*Math.sin(ang) * wheelRadius, z);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5); 

      if (z > 0)
          normals.push(0,0,1, 0,0,1, 0,0,1  );    
      else
          normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    
      ang += angInc;
    }
    z = -z;
  }

  // WHEEL EDGES
  ang = 0;
  var drawTooth = true;
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
    if (drawTooth) {

      vertices.push(
       rad*Math.cos(ang),rad*Math.sin(ang),-z,
       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

      vertices.push(
       rad*Math.cos(ang),rad*Math.sin(ang),-z,
       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
       rad*Math.cos(ang),rad*Math.sin(ang),z);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
    }

    ang += angInc;
  }

  ang = 0;
  for (i = 0; i < n; i++) {
    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];

    vertices.push(
     rad*Math.cos(ang) * wheelRadius,rad*Math.sin(ang) * wheelRadius,-z,
     rad*Math.cos(ang+angInc) * wheelRadius,rad*Math.sin(ang+angInc) * wheelRadius,-z,
     rad*Math.cos(ang+angInc) * wheelRadius,rad*Math.sin(ang+angInc) * wheelRadius,z);

    colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

    vertices.push(
     rad*Math.cos(ang) * wheelRadius,rad*Math.sin(ang) * wheelRadius,-z,
     rad*Math.cos(ang+angInc) * wheelRadius,rad*Math.sin(ang+angInc) * wheelRadius,z,
     rad*Math.cos(ang) * wheelRadius,rad*Math.sin(ang) * wheelRadius,z);

    colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

    ang += angInc;
  }


// TEETH FACE
  var r;
  for (r = 0; r < 2; r++) {
    ang = 0;
    var drawTooth = false;

    for ( i = 0; i < n; i++) {
      drawTooth = !drawTooth;
      if (drawTooth) {

      vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
        rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * teethAngle);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);

      if (z > 0)
        normals.push(0,0,1, 0,0,1, 0,0,1  );    
      else
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

      vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * teethAngle,
        outRad*Math.cos(ang), outRad*Math.sin(ang), z * teethAngle);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);

      if (z > 0)
        normals.push(0,0,1, 0,0,1, 0,0,1  );    
      else
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

      }
      ang += angInc;
    }
    z = -z;
  }
  z = -z;

  // TEETH ROOF
  ang = 0;
  drawTooth = false;
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {

      var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
      vertices.push(
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z * teethAngle,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * teethAngle,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * teethAngle);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

      vertices.push(
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z * teethAngle,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * teethAngle,
        outRad*Math.cos(ang),outRad*Math.sin(ang),z * teethAngle);

      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

    }
    ang += angInc;
  }


  // TEETH WALLS
  ang = 0;
  drawTooth = false;
  for ( i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {
      var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
        outRad*Math.cos(ang),outRad*Math.sin(ang),z);

      vertices.push(
        rad*Math.cos(ang),   rad*Math.sin(ang),-z * teethAngle,
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z * teethAngle,
        outRad*Math.cos(ang),outRad*Math.sin(ang),z * teethAngle);
      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);


      vertices.push(
        rad*Math.cos(ang),   rad*Math.sin(ang),-z * teethAngle,
        outRad*Math.cos(ang),outRad*Math.sin(ang),z * teethAngle,
        rad*Math.cos(ang),   rad*Math.sin(ang),z);
      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

      vertices.push(
        rad*Math.cos(ang),   rad*Math.sin(ang),-z * teethAngle,
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z * teethAngle,
        rad*Math.cos(ang),   rad*Math.sin(ang),-z);
      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

      var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z);

      vertices.push(
        rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z * teethAngle, // bottom left
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * teethAngle, // top left
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * teethAngle); // top right
      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);          


      vertices.push(
        rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z * teethAngle,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * teethAngle,
        rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z);
      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

      vertices.push(
        rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z * teethAngle,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * teethAngle,
        rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z);
      colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
    }
    ang += angInc;
  }


  return [vertices,colors,normals]
}


function calcNormal(x1, y1,  z1,
  x2,  y2,  z2,
  x3,  y3,  z3) {

  var ux = x2-x1, uy = y2-y1, uz = z2-z1;
  var vx = x3-x1, vy = y3-y1, vz = z3-z1;

  return [ uy * vz - uz * vy,
  uz * vx - ux * vz,
  ux * vy - uy * vx];
}