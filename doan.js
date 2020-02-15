//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function doanGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = numTeeth;
   var spokes = numSpokes;
   var slantTeeth = 0.4;
   var rad = 1.0;
   var inRad = rad * 0.8;
   var outRad = rad * 1.2;
   var centerRad = rad * 0.4;
   var inCenterRad = rad * 0.2;
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.1;
   var r;
   var i;       

/*   for (i = 0; i < n; i++) {    //  coin face, front
      
         vertices.push(0,0,z,
                       rad*Math.cos(ang),rad*Math.sin(ang),z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
         ang += angInc;
   }

   ang = 0;
   for (i = 0; i < n; i++) {
      

         var mat = new Learn_webgl_matrix();
         var rotateMat =  mat.create();
         mat.rotate(rotateMat, 180, 0,1,0);

         var vec4 = new Learn_webgl_point4();
         var v1 = vec4.create(0,0,z);
         var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
         var v3 = vec4.create(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

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

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
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

   //var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z ,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z *slantTeeth)

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z *slantTeeth,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), z *slantTeeth);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

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

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
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
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z *slantTeeth,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z *slantTeeth,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z *slantTeeth)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z *slantTeeth,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z *slantTeeth,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z *slantTeeth)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
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
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),z);

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z *slantTeeth,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z *slantTeeth)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z *slantTeeth,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            



           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
				                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z);
		                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z *slantTeeth,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z *slantTeeth)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z *slantTeeth,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])           
           

		}
	    ang += angInc;
   }

////////////////////////////


   for (r = 0; r < 2; r++) {      // inside ring
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n*2; i++) {       
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z ,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               inRad*Math.cos(ang+angInc), inRad*Math.sin(ang+angInc), z)

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               inRad*Math.cos(ang+angInc), inRad*Math.sin(ang+angInc), z,
                               inRad*Math.cos(ang), inRad*Math.sin(ang), z);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += angInc/2;
        }
        z = -z;
   }
   z = -z;


   ang = 0;                          // inside ring edge
   var drawTooth = true;
   for (i = 0; i < n*2; i++) {
        drawTooth = !drawTooth;
// 	    var norm = [inRad*Math.cos(ang+angInc/2),inRad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
        vertices.push(
               inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
               inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),-z,
               inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])    

        vertices.push(
               inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
               inRad*Math.cos(ang+angInc),inRad*Math.sin(ang+angInc),z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])    
        }

	    ang += angInc/2;
    }
    

   ang = 0;                          // center ring outside edge
   var drawTooth = true;
   for (i = 0; i < n*2; i++) {
        drawTooth = !drawTooth;
//  	    var norm = [centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),0];
        if (drawTooth) {
          
        vertices.push(
               centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
               centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z,
               centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
               centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z,
               centerRad*Math.cos(ang),centerRad*Math.sin(ang),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc/2;
   }

   for (r = 0; r < 2; r++) {      // center ring
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n*2; i++) {       
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(centerRad*Math.cos(ang), centerRad*Math.sin(ang), z ,
                               centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc), z,
                               inCenterRad*Math.cos(ang+angInc), inCenterRad*Math.sin(ang+angInc), z)

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(centerRad*Math.cos(ang), centerRad*Math.sin(ang), z,
                               inCenterRad*Math.cos(ang+angInc), inCenterRad*Math.sin(ang+angInc), z,
                               inCenterRad*Math.cos(ang), inCenterRad*Math.sin(ang), z);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += angInc/2;
        }
        z = -z;
   }
   z = -z;


   ang = 0;                          // center ring inside edge
   var drawTooth = true;
   for (i = 0; i < n*2; i++) {
        drawTooth = !drawTooth;
// 	    var norm = [inCenterRad*Math.cos(ang+angInc/2),inCenterRad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
        vertices.push(
               inCenterRad*Math.cos(ang),inCenterRad*Math.sin(ang),-z,
               inCenterRad*Math.cos(ang+angInc),inCenterRad*Math.sin(ang+angInc),-z,
               inCenterRad*Math.cos(ang+angInc),inCenterRad*Math.sin(ang+angInc),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               inCenterRad*Math.cos(ang),inCenterRad*Math.sin(ang),-z,
               inCenterRad*Math.cos(ang+angInc),inCenterRad*Math.sin(ang+angInc),z,
               inCenterRad*Math.cos(ang),inCenterRad*Math.sin(ang),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc/2;
    }


////////////////////////////


   ang = 0;
   angInc = 2*3.14159/spokes;
   var spokeWidth = 0.3;
   inRad += 0.1;


   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < spokes*2; i++) {       // faces of spokes
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(centerRad*Math.cos(ang), centerRad*Math.sin(ang), z ,
                               centerRad*Math.cos(ang+spokeWidth), centerRad*Math.sin(ang+spokeWidth), z,
                               inRad*Math.cos(ang+spokeWidth), inRad*Math.sin(ang+spokeWidth), z)

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(centerRad*Math.cos(ang), centerRad*Math.sin(ang), z,
                               inRad*Math.cos(ang+spokeWidth), inRad*Math.sin(ang+spokeWidth), z,
                               inRad*Math.cos(ang), inRad*Math.sin(ang), z);

                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += angInc/2;
        }
        z = -z;
   }
   z = -z;
    

   ang = 0;
   drawTooth = false;
   for ( i = 0; i < spokes*2; i++) {   // spoke walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		   var norm = calcNormal(centerRad*Math.cos(ang), centerRad*Math.sin(ang),-z,
			                     inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
				                 inRad*Math.cos(ang),inRad*Math.sin(ang),z);

           vertices.push(
               centerRad*Math.cos(ang),   centerRad*Math.sin(ang),-z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               centerRad*Math.cos(ang),   centerRad*Math.sin(ang),-z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),z,
               centerRad*Math.cos(ang),   centerRad*Math.sin(ang),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            



           var norm = calcNormal( centerRad*Math.cos(ang+spokeWidth), centerRad*Math.sin(ang+spokeWidth),-z,
			                        inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),-z,
				                    inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),z);
		                  
           vertices.push(
               centerRad*Math.cos(ang+spokeWidth),   centerRad*Math.sin(ang+spokeWidth),-z,
               inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),-z,
               inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               centerRad*Math.cos(ang+spokeWidth),   centerRad*Math.sin(ang+spokeWidth),-z,
               inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),z,
               centerRad*Math.cos(ang+spokeWidth),   centerRad*Math.sin(ang+spokeWidth),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])           
           

		}
	    ang += angInc;
   }
 

    ang = angInc;
    
    drawTooth = false;
    for ( i = 0; i < spokes*2; i++) {   // spoke walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		   var norm = calcNormal(centerRad*Math.cos(ang), centerRad*Math.sin(ang),-z,
			                     inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
				                 inRad*Math.cos(ang),inRad*Math.sin(ang),z);

           vertices.push(
               centerRad*Math.cos(ang),   centerRad*Math.sin(ang),-z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),-z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               centerRad*Math.cos(ang),   centerRad*Math.sin(ang),-z,
               inRad*Math.cos(ang),inRad*Math.sin(ang),z,
               centerRad*Math.cos(ang),   centerRad*Math.sin(ang),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            



           var norm = calcNormal( centerRad*Math.cos(ang+spokeWidth), centerRad*Math.sin(ang+spokeWidth),-z,
			                        inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),-z,
				                    inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),z);
		                  
           vertices.push(
               centerRad*Math.cos(ang+spokeWidth),   centerRad*Math.sin(ang+spokeWidth),-z,
               inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),-z,
               inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               centerRad*Math.cos(ang+spokeWidth),   centerRad*Math.sin(ang+spokeWidth),-z,
               inRad*Math.cos(ang+spokeWidth),inRad*Math.sin(ang+spokeWidth),z,
               centerRad*Math.cos(ang+spokeWidth),   centerRad*Math.sin(ang+spokeWidth),z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
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