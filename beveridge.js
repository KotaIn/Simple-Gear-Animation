//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function beveridgeGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles
    //.804,.498,.196
   var color = {r:.804, g:.498, b:.196};
   var n = numTeeth*2;
   var nspk = numSpokes*2;
   var rad = 1.0;
   var outRad = rad * 1.2
   var angInc = 2*3.14159/n;
   var angIncSpoke = 2*3.14159/nspk;
   var ang = 0;
   var z = 0.1;

   var i;       //  coin face, front
   for (i = 0; i < nspk; i++) {
        if(i%2==0){
            vertices.push(0,0,z,
                        rad*Math.cos(ang),rad*Math.sin(ang),z,
                        rad*Math.cos(ang+angIncSpoke),rad*Math.sin(ang+angIncSpoke),z)

            colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            //colors.push( 1,0,0,  0,1,0,  0,0,1);
            normals.push(0,0,1, 0,0,1, 0,0,1  );
        }
        ang += angIncSpoke;
   }

   ang = angIncSpoke;
   for (i = 0; i < nspk; i++) {
        if(i%2===0){
            var mat = new Learn_webgl_matrix();
            var rotateMat =  mat.create();
            mat.rotate(rotateMat, 180, 0,1,0);

            var vec4 = new Learn_webgl_point4();
            var v1 = vec4.create(0,0,z);
            var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
            var v3 = vec4.create(rad*Math.cos(ang+angIncSpoke),rad*Math.sin(ang+angIncSpoke),z);

            var newV1 = vec4.create();   
            mat.multiplyP4(newV1,rotateMat,v1);

            var newV2 = vec4.create();   
            mat.multiplyP4(newV2,rotateMat,v2);

            var newV3 = vec4.create();   
            mat.multiplyP4(newV3,rotateMat,v3);                  


            vertices.push(  newV1[0], newV1[1], newV1[2],  
                            newV2[0], newV2[1], newV2[2],          
                            newV3[0], newV3[1], newV3[2]                              
                        )

            colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            //colors.push( 1,0,0,  0,1,0,  0,0,1);
            /// AND WE COULD HAVE ROTATED THE NORMALS
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
        }
        ang += angIncSpoke;
   }   

   //function solidCircle(rad, inRad, angInc, n, vertices, colors, normals){
   solidCircle(.2, 0, angInc, n, vertices, colors, normals, color);
   solidCircle(1, .8, angInc, n, vertices, colors, normals, color);

//    ang = 0;   // coin face, back
//    for (i = 0; i < n; i++) {
      
//          vertices.push(0,0,-z,
//                        rad*Math.cos(ang),rad*Math.sin(ang),-z,
//                        rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)

//          colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
//          normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
//          ang += angInc;
//    }


   var leanOffset = .05;
   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {
                colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
                colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b); 
                if (z > 0){
                    vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                        rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z-leanOffset);
                    //normals.push(0,0,1, 0,0,1, 0,0,1  );   
                    var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                        rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z-leanOffset);
                    //flip the normals since they seem to be backwards on rear face
                    normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
                    
                    vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z-leanOffset,
                        outRad*Math.cos(ang), outRad*Math.sin(ang), z-leanOffset);
                    
                    normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);

                } else {
                    vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                        rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+leanOffset);
                    //normals.push(0,0,-1, 0,0,-1, 0,0,-1  ); 
                    var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                    rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+leanOffset);
                    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

                    vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                        outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+leanOffset,
                        outRad*Math.cos(ang), outRad*Math.sin(ang), z+leanOffset);
                    //normals.push(0,0,-1, 0,0,-1, 0,0,-1  ); 
                    normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
                }     

		     }
	         ang += angInc;
        }
        z = -z;
   }

   z = -z;



   
   ang = 0;                          // coin edge
   var drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }


 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z-leanOffset,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z-leanOffset,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+leanOffset)

        colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z-leanOffset,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+leanOffset,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z+leanOffset);

        colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);         

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		   var normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),z);

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z-leanOffset,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z+leanOffset)
           colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z+leanOffset,
               rad*Math.cos(ang),   rad*Math.sin(ang),z);
           colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]) ;            



           var normal = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
				                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z);
				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z-leanOffset,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+leanOffset);
           colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+leanOffset,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);           
           

		}
	    ang += angInc;
   }

   




    



    return [vertices,colors,normals]
}


function solidCircle(rad, inRad, angInc, n, vertices, colors, normals, color){
    var ang = 0;
    var z = 0.1;      //  coin face, front
    for (var i = 0; i < n; i++) {
        vertices.push(inRad*Math.cos(ang),inRad*Math.sin(ang),z,
            rad*Math.cos(ang),rad*Math.sin(ang),z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

        colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        normals.push(0,0,1, 0,0,1, 0,0,1  );

        vertices.push(inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
            rad*Math.cos(ang),rad*Math.sin(ang),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z);

        colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
        if(inRad!==0){
            vertices.push(inRad*Math.cos(ang),inRad*Math.sin(ang),z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z);
            colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            normals.push(0,0,1, 0,0,1, 0,0,1  );

            vertices.push(inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
            inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z);
            colors.push( color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
        }
        ang += angInc;
    }

    ang = 0;                          // coin edge
    var drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
            vertices.push(
                rad*Math.cos(ang),rad*Math.sin(ang),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

            colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

            vertices.push(
                rad*Math.cos(ang),rad*Math.sin(ang),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
                rad*Math.cos(ang),rad*Math.sin(ang),z);

            colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]); 

            vertices.push(
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
                rad*Math.cos(ang+angInc+angInc),rad*Math.sin(ang+angInc+angInc),z);
            colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

            vertices.push(
                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
                rad*Math.cos(ang+angInc+angInc),rad*Math.sin(ang+angInc+angInc),z,
                rad*Math.cos(ang+angInc+angInc),rad*Math.sin(ang+angInc+angInc),-z);
            colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

            if(inRad !== 0){
                vertices.push(
                    inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
                    inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z,
                    inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z);
    
                colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
                normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
    
                vertices.push(
                    inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
                    inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z,
                    inRad*Math.cos(ang),inRad*Math.sin(ang),z);
    
                colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
                normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);

                vertices.push(
                    inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z,
                    inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z,
                    inRad*Math.cos(ang+angInc+angInc),inRad*Math.sin(ang+angInc+angInc),z);
                colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
                normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);

                vertices.push(
                    inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z,
                    inRad*Math.cos(ang+angInc+angInc),inRad*Math.sin(ang+angInc+angInc),z,
                    inRad*Math.cos(ang+angInc+angInc),inRad*Math.sin(ang+angInc+angInc),-z);
                colors.push(color.r,color.g,color.b,   color.r,color.g,color.b,   color.r,color.g,color.b);
                normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
            }          
        }

        ang += angInc;
    }
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