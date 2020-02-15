//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function walshGear(numTeeth, numSpokes, wheelSize, ringSize) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles
    var n = numTeeth*2 || 32;
    var spokes = numSpokes*2 || n/2;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2*Math.PI/n;
    var spokeAngInc = 2*Math.PI/spokes;
    var ang = 0;
    var z = .2;
    var toothWidth = 0.1; // Larger value gives thinner tooth, cannot be larger than z
    var smoothingFactor = 512;
    var ringThickness = wheelSize || 1.15;
    var wheelThickness = ringSize || 2.5; // Larger value gives smaller wheel
    // var color = [0.26,0.27,0.29, 0.26,0.27,0.29, 0.26,0.27,0.29]; // Steel
    var color = [0.72,0.45,0.2, 0.72,0.45,0.2, 0.72,0.45,0.2]; // Copper
    // var color = [0.75,0.75,0.75, 0.75,0.75,0.75, 0.75,0.75,0.75]; // Silver
    // var color = [1,0.84,0, 1,0.84,0, 1,0.84,0]; // Gold



    var i;       //  coin face, front
     
    for (i = 0; i < n; i++) { // ring face
        //front
        vertices.push((rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z,
            rad*Math.cos(ang),rad*Math.sin(ang),z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

    
        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,1, 0,0,1, 0,0,1);

        vertices.push((rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z);

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,1, 0,0,1, 0,0,1);

        //back
        vertices.push((rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z,
            rad*Math.cos(ang),rad*Math.sin(ang),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z);

    
        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1);

        vertices.push((rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z);

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1);

        ang += angInc;
    }

   ang = 0;
   var temp1 = ringThickness;
   var temp2 = wheelThickness;
   ringThickness = ringThickness/1.1;
   wheelThickness = wheelThickness + 0.02;
   for (i = 0; i < spokes; i++) { // spokes face
          //front
        vertices.push((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,1, 0,0,1, 0,0,1);

        vertices.push((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
            (rad/wheelThickness)*Math.cos(ang+spokeAngInc),(rad/wheelThickness)*Math.sin(ang+spokeAngInc),z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,1, 0,0,1, 0,0,1);

        //back
        vertices.push((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),-z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1);

        vertices.push((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/wheelThickness)*Math.cos(ang+spokeAngInc),(rad/wheelThickness)*Math.sin(ang+spokeAngInc),-z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),-z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1);

        ang += spokeAngInc*2;
    }

    ang = 0;
   for (i = 0; i < spokes; i++) { // spokes wall

        var norm = calcNormal((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
                (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
                (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z);

        vertices.push((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        norm = calcNormal((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z);

        vertices.push((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


        norm = calcNormal((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),z);
      
        vertices.push((rad/wheelThickness)*Math.cos(ang+spokeAngInc),(rad/wheelThickness)*Math.sin(ang+spokeAngInc),-z,
            (rad/wheelThickness)*Math.cos(ang+spokeAngInc),(rad/wheelThickness)*Math.sin(ang+spokeAngInc),z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

        norm = calcNormal((rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),-z);

        vertices.push((rad/wheelThickness)*Math.cos(ang+spokeAngInc),(rad/wheelThickness)*Math.sin(ang+spokeAngInc),-z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),z,
            (rad/ringThickness)*Math.cos(ang+spokeAngInc),(rad/ringThickness)*Math.sin(ang+spokeAngInc),-z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])  

         ang += spokeAngInc*2;
   }

    ringThickness = temp1;
    wheelThickness = temp2;


   ang = 0;
   for (i = 0; i < n; i++) { // center wheel face
    vertices.push(0,0,z,
        (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
        (rad/wheelThickness)*Math.cos(ang+angInc),(rad/wheelThickness)*Math.sin(ang+angInc),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,1, 0,0,1, 0,0,1  );

        vertices.push(0,0,-z,
            (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/wheelThickness)*Math.cos(ang+angInc),(rad/wheelThickness)*Math.sin(ang+angInc),-z)
    
        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

        ang += angInc;
   }


   var r;
   
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
             drawTooth = !drawTooth;
             
	         if (drawTooth) {
                if (z > 0) {
                    toothWidth = -toothWidth;
                }
                var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang),z,
                    rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),z,
                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),z + toothWidth);

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang),z,
                    rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),z,
                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),z + toothWidth);
                
                if (z > 0) {
                    normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]); 
                } else {
                   normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]); 
                }

                colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);


                norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z + toothWidth,
                    outRad*Math.cos(ang), outRad*Math.sin(ang), z + toothWidth);

                vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z + toothWidth,
                    outRad*Math.cos(ang), outRad*Math.sin(ang), z + toothWidth);

                
                 if (z > 0) {
                     toothWidth = -toothWidth;
                     normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]); 
                 } else {
                    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]); 
                 }
                 colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
		     }
	         ang += angInc;
        }
        z = -z;
   }


   
   ang = 0;                          // coin edge
   var drawTooth = true;
   for (i = 0; i < n * smoothingFactor; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
        vertices.push(rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc / smoothingFactor;
   }

   ang = 0;                          // ring edge
   for (i = 0; i < n * smoothingFactor; i++) {

        norm = calcNormal((rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z,
           (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z);
          
        vertices.push((rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


        norm = calcNormal((rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),-z);

        vertices.push((rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),z,
            (rad/ringThickness)*Math.cos(ang),(rad/ringThickness)*Math.sin(ang),-z,
            (rad/ringThickness)*Math.cos(ang+angInc),(rad/ringThickness)*Math.sin(ang+angInc),-z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2],-norm[0],-norm[1],-norm[2])            

	    ang += angInc / smoothingFactor;
   }

   ang = 0;                          // center wheel edge
   for (i = 0; i < n * smoothingFactor; i++) {
	    var norm = [rad*Math.cos(ang+angInc/wheelThickness),rad*Math.sin(ang+angInc/wheelThickness),0];

          
        vertices.push(
            (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),z,
            (rad/wheelThickness)*Math.cos(ang+angInc),(rad/wheelThickness)*Math.sin(ang+angInc),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
            (rad/wheelThickness)*Math.cos(ang),(rad/wheelThickness)*Math.sin(ang),-z,
            (rad/wheelThickness)*Math.cos(ang+angInc),(rad/wheelThickness)*Math.sin(ang+angInc),-z,
            (rad/wheelThickness)*Math.cos(ang+angInc),(rad/wheelThickness)*Math.sin(ang+angInc),z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            

	    ang += angInc / smoothingFactor;
   }

    ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        // var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        norm = calcNormal(outRad*Math.cos(ang),outRad*Math.sin(ang),z - toothWidth,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z - toothWidth,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z + toothWidth);

        vertices.push(outRad*Math.cos(ang),outRad*Math.sin(ang),z - toothWidth,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z - toothWidth,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z + toothWidth)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);

        norm = calcNormal(outRad*Math.cos(ang),outRad*Math.sin(ang),z - toothWidth,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z + toothWidth,
            outRad*Math.cos(ang),outRad*Math.sin(ang),-z + toothWidth);

        vertices.push(outRad*Math.cos(ang),outRad*Math.sin(ang),z - toothWidth,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z + toothWidth,
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z + toothWidth)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);          

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		var norm = calcNormal(rad*Math.cos(ang),rad*Math.sin(ang),z,
            outRad*Math.cos(ang),outRad*Math.sin(ang),z -toothWidth,
            outRad*Math.cos(ang),outRad*Math.sin(ang),-z +toothWidth);

        vertices.push(rad*Math.cos(ang),rad*Math.sin(ang),z,
            outRad*Math.cos(ang),outRad*Math.sin(ang),z -toothWidth,
            outRad*Math.cos(ang),outRad*Math.sin(ang),-z +toothWidth)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


        norm = calcNormal(rad*Math.cos(ang),rad*Math.sin(ang),z,
            outRad*Math.cos(ang),outRad*Math.sin(ang),-z +toothWidth,
            rad*Math.cos(ang),rad*Math.sin(ang),-z);

        vertices.push(rad*Math.cos(ang),rad*Math.sin(ang),z,
            outRad*Math.cos(ang),outRad*Math.sin(ang),-z +toothWidth,
            rad*Math.cos(ang),rad*Math.sin(ang),-z)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



        norm = calcNormal(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z -toothWidth,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z +toothWidth);
				                  
        vertices.push(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z -toothWidth,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z +toothWidth)

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

        norm = calcNormal(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z + toothWidth,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z );

        vertices.push(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z +toothWidth,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z )

        colors.push(color[0],color[1],color[2],color[3],color[4],color[5],color[6],color[7],color[8]);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
           

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