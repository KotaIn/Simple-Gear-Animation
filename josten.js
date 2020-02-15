//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
 

/**
 * Function that will programatically make a gear with specified number
 * of teeth and spokes
 * @author Michael Josten: spokes, angled teeth, specular lighting
 * @param {number} numTeeth The number of teeth to have on the gear
 * @param {number} numSpokes The number of spokes for the gear to have
 */
function mjostenGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = numTeeth * 2;
   var spokes = numSpokes;
   var spokeInterval = Math.round(n/spokes);
   var rad = 1.0;
   var sRad = rad * 0.85;
   var outRad = rad * 1.2;
   var inRad = rad * 0.35;
   var tz = 0.05;
   var angInc = 2*3.14159/n;
   //var spokeInc = 2 * 3.14159/spokes;
   var ang = 0;
   var z = 0.1;

   /* Copper color */
   var r = 0.72;
   var g = 0.45;
   var b = 0.2;

   var i;       //  coin face, front
   for (i = 0; i < n; i++) {
      
    //origin to inRad
        vertices.push(0, 0, z,
            inRad*Math.cos(ang), inRad*Math.sin(ang),z,
            inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z);
        //  vertices.push(0,0,z,
        //                rad*Math.cos(ang),rad*Math.sin(ang),z,
        //                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)
        

         colors.push(r,g,b, r,g,b, r,g,b);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
        
    //

         ang += angInc;
   }

   ang = 0;
   for (i = 0; i < n; i++) {    // coin face, back
      

         var mat = new Learn_webgl_matrix();
         var rotateMat =  mat.create();
         mat.rotate(rotateMat, 180, 0,1,0);

         var vec4 = new Learn_webgl_point4();
         var v1 = vec4.create(0,0,z);
         var v2 = vec4.create(inRad*Math.cos(ang),inRad*Math.sin(ang),z);
         var v3 = vec4.create(inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z);

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

         //colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         colors.push(r,g,b, r,g,b, r,g,b);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         /// AND WE COULD HAVE ROTATED THE NORMALS
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
   }   

   

/*
   ang = 0;   // coin face, back
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,-z,
                       rad*Math.cos(ang),rad*Math.sin(ang),-z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
   }

*/



   var j;
   for (j = 0; j < 2; j++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {
                // var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
                //     outRad*Math.cos(ang),outRad*Math.sin(ang),-tz,
                //     outRad*Math.cos(ang),outRad*Math.sin(ang),tz);
                var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                    rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), tz);

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), tz);

                 //colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
                 colors.push(r,g,b, r,g,b, r,g,b);
                  
                 if (z > 0)
                    normals.push(norm[0], norm[1], -norm[2],norm[0], norm[1], -norm[2],norm[0], norm[1], -norm[2]);
                 else
                    normals.push(norm[0], norm[1], norm[2],norm[0], norm[1], norm[2],norm[0], norm[1], norm[2]);   
                //normals.push(norm[0], norm[1], norm[2],norm[0], norm[1], norm[2],norm[0], norm[1], norm[2]); 

                norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), tz,
                                    outRad*Math.cos(ang), outRad*Math.sin(ang), tz);

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), tz,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), tz);


                 //colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
                 colors.push(r,g,b, r,g,b, r,g,b);

                 if (z > 0)
                    normals.push(norm[0], norm[1], -norm[2],norm[0], norm[1], -norm[2],norm[0], norm[1], -norm[2]);   
                 else
                     normals.push(norm[0], norm[1], norm[2],norm[0], norm[1], norm[2],norm[0], norm[1], norm[2]);    
                //normals.push(norm[0], norm[1], norm[2],norm[0], norm[1], norm[2],norm[0], norm[1], norm[2]);

		     }
	         ang += angInc;
        }
        tz = -tz;
        z = -z;
   }

   for (j=0; j<2; j++) {
       ang = 0;
       for (i = 0; i < n; i++) {    // draw the little square from from the rad to little bit before. 
            vertices.push(sRad*Math.cos(ang), sRad*Math.sin(ang), z,
            sRad*Math.cos(ang+angInc), sRad*Math.sin(ang+angInc), z,
            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z)

            colors.push(r,g,b, r,g,b, r,g,b)

            if (z > 0)
            normals.push(0,0,1, 0,0,1, 0,0,1  );    
            else
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

            vertices.push(sRad*Math.cos(ang), sRad*Math.sin(ang), z,
                    rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                    rad*Math.cos(ang), rad*Math.sin(ang), z);


            colors.push(r,g,b, r,g,b, r,g,b) 

            if (z > 0)
            normals.push(0,0,1, 0,0,1, 0,0,1  );    
            else
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

            ang += angInc;
        }
        z = -z;
    }

    //Draw spokes from inRad to sRad every spoke interval
    for (j=0;j<2;j++) {
        ang=0;
        for (i = 0; i < n; i++) {
            if (((i % spokeInterval == 0) && !(i == 0)) || (n%spokes == 0 && i % spokeInterval == 0)) {
                //draw the spoke
                vertices.push(inRad*Math.cos(ang-angInc), inRad*Math.sin(ang-angInc), z,
                inRad*Math.cos(ang+angInc + angInc), inRad*Math.sin(ang+angInc+angInc), z,
                sRad*Math.cos(ang+angInc), sRad*Math.sin(ang+angInc), z)

                colors.push(r,g,b, r,g,b, r,g,b)

                if (z > 0)
                normals.push(0,0,1, 0,0,1, 0,0,1  );    
                else
                normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                vertices.push(inRad*Math.cos(ang-angInc), inRad*Math.sin(ang-angInc), z,
                        sRad*Math.cos(ang+angInc), sRad*Math.sin(ang+angInc), z,
                        sRad*Math.cos(ang), sRad*Math.sin(ang), z);


                colors.push(r,g,b, r,g,b, r,g,b) 

                if (z > 0)
                normals.push(0,0,1, 0,0,1, 0,0,1  );    
                else
                normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                
            }
            ang += angInc;
        }
        z = -z;
    }

    ang = 0;
    for (i = 0; i < n; i++) {   // draw the faces on the spokes
        if (((i % spokeInterval == 0) && !(i == 0)) || (n%spokes == 0 && i % spokeInterval == 0)) {
            var norm = [inRad*Math.cos(ang+angInc/2),inRad*Math.sin(ang+angInc/2),0];
            vertices.push(
                inRad*Math.cos(ang-angInc),inRad*Math.sin(ang-angInc),z,
                inRad*Math.cos(ang-angInc),inRad*Math.sin(ang-angInc),-z,
                sRad*Math.cos(ang),sRad*Math.sin(ang),-z)

            colors.push(r,g,b, r,g,b, r,g,b)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(
                inRad*Math.cos(ang-angInc),inRad*Math.sin(ang-angInc),z,
                sRad*Math.cos(ang),sRad*Math.sin(ang),z,
                sRad*Math.cos(ang),sRad*Math.sin(ang),-z)

            colors.push(r,g,b, r,g,b, r,g,b)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]) 

            // Draw other side of the spoke 
            vertices.push(
                inRad*Math.cos(ang+angInc+angInc),inRad*Math.sin(ang+angInc+angInc),z,
                inRad*Math.cos(ang+angInc+angInc),inRad*Math.sin(ang+angInc+angInc),-z,
                sRad*Math.cos(ang+angInc),sRad*Math.sin(ang+angInc),-z)

            colors.push(r,g,b, r,g,b, r,g,b)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(
                inRad*Math.cos(ang+angInc+angInc),inRad*Math.sin(ang+angInc+angInc),z,
                sRad*Math.cos(ang+angInc),sRad*Math.sin(ang+angInc),z,
                sRad*Math.cos(ang+angInc),sRad*Math.sin(ang+angInc),-z)

            colors.push(r,g,b, r,g,b, r,g,b)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]) 
        }
        ang += angInc;
    }

    ang = 0;
    for (i = 0; i < n; i++) {  // draw the face on the inRad
        var norm = [inRad*Math.cos(ang+angInc/2),inRad*Math.sin(ang+angInc/2),0];
        vertices.push(
            inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
            inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z,
            inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
            inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
            inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z,
            inRad*Math.cos(ang),inRad*Math.sin(ang),z)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])  

        ang += angInc;
    }

    ang = 0;
    for (i = 0; i < n; i++) {
        var norm = [sRad*Math.cos(ang+angInc/2),sRad*Math.sin(ang+angInc/2),0];
        vertices.push(
            sRad*Math.cos(ang),sRad*Math.sin(ang),-z,
            sRad*Math.cos(ang+angInc),sRad*Math.sin(ang+angInc),-z,
            sRad*Math.cos(ang+angInc),sRad*Math.sin(ang+angInc),z)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
            sRad*Math.cos(ang),sRad*Math.sin(ang),-z,
            sRad*Math.cos(ang+angInc),sRad*Math.sin(ang+angInc),z,
            sRad*Math.cos(ang),sRad*Math.sin(ang),z)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])  

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
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(r,g,b, r,g,b, r,g,b)
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
              outRad*Math.cos(ang),outRad*Math.sin(ang),-tz,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-tz,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),tz)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-tz,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),tz,
              outRad*Math.cos(ang),outRad*Math.sin(ang),tz)

        colors.push(r,g,b, r,g,b, r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-tz,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),tz);

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-tz,
               outRad*Math.cos(ang),outRad*Math.sin(ang),tz)
           colors.push(r,g,b, r,g,b, r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),tz,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
           colors.push(r,g,b, r,g,b, r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-tz,
				                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),tz);
				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-tz,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),tz)
           colors.push(r,g,b, r,g,b, r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),tz,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(r,g,b, r,g,b, r,g,b)
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