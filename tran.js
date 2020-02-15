//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function createAllenT94Gear(t,s) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = 40;
   var teethN = t;
   var spokeN = s;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2*3.14159/n;
   var teethAngInc = 2*3.14159/teethN;
   var spokeAngInc = 2*3.14159/spokeN;
   var ang = 0;
   var z = 0.1;

   var i;       //  coin face, front

   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,z/3,
                       rad*Math.cos(ang)/3,rad*Math.sin(ang)/3,z/3,
                       rad*Math.cos(ang+angInc)/3,rad*Math.sin(ang+angInc)/3,z/3)

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
         ang += angInc;
   }




   ang = 0;

   var drawSpoke = false;

   for (i = 0; i <= spokeN; i++) { //coin face, back
     
     drawSpoke = !drawSpoke;

     if(drawSpoke){

          vertices.push(0,0,z/3,

          rad*Math.cos(ang),rad*Math.sin(ang),z,

          rad*Math.cos(ang+spokeAngInc),rad*Math.sin(ang+spokeAngInc),z)
   
          colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);

          normals.push(0,0,1, 0,0,1, 0,0,1  );


     }
     ang += spokeAngInc;

      
}



ang = 0;

drawSpoke = false;

for (i = 0; i < spokeN; i++) {
     
     drawSpoke = !drawSpoke;
     if(drawSpoke){


        vertices.push(0,0, -z/3,
        rad*Math.cos(ang),rad*Math.sin(ang), -z,
        rad*Math.cos(ang+spokeAngInc),rad*Math.sin(ang+spokeAngInc),-z)

        colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        /// AND WE COULD HAVE ROTATED THE NORMALS
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

    

    }
        ang += spokeAngInc;

  
}


   ang = 0;
   for (i = 0; i < n; i++) {
      

         var mat = new Learn_webgl_matrix();
         var rotateMat =  mat.create();
         mat.rotate(rotateMat, 180, 0,1,0);

         var vec4 = new Learn_webgl_point4();
         var v1 = vec4.create(0,0,z);
         var v2 = vec4.create(rad*Math.cos(ang)/3,rad*Math.sin(ang)/3,z/3);
         var v3 = vec4.create(rad*Math.cos(ang+angInc)/3,rad*Math.sin(ang+angInc)/3,z/3);

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
         ang += angInc ;
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

        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < teethN; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+teethAngInc), rad*Math.sin(ang+teethAngInc) , z,
                               outRad*Math.cos(ang+teethAngInc), outRad*Math.sin(ang+teethAngInc), z - 0.050)

                               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)



                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
  

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+teethAngInc), outRad*Math.sin(ang+teethAngInc), z - 0.050,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), z - 0.050);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 


                      normals.push(0,0,1, 0,0,1, 0,0,1  );    

		     }
	         ang += teethAngInc;
        }


        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < teethN; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                               rad*Math.cos(ang+teethAngInc), rad*Math.sin(ang+teethAngInc) , -z,
                               outRad*Math.cos(ang+teethAngInc), outRad*Math.sin(ang+teethAngInc), -z + 0.050)

                               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)



                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    
  

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                               outRad*Math.cos(ang+teethAngInc), outRad*Math.sin(ang+teethAngInc), -z + 0.050,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), -z + 0.050);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 


                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

		     }
	         ang += teethAngInc;
        }


   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
      

        for ( i = 0; i < teethN; i++) {       // RING TOP
	         drawTooth = !drawTooth;

                 vertices.push(rad*Math.cos(ang)/1.1, rad*Math.sin(ang)/1.1, z/1.1,
                               rad*Math.cos(ang+teethAngInc)/1.1, rad*Math.sin(ang+teethAngInc)/1.1 , z/1.1,
                               rad*Math.cos(ang+teethAngInc), rad*Math.sin(ang+teethAngInc), z)

                               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
                  
                 console.log("First Z: " + z);

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                 vertices.push(rad*Math.cos(ang)/1.1, rad*Math.sin(ang)/1.1, z/1.1 ,
                               rad*Math.cos(ang+teethAngInc), rad*Math.sin(ang+teethAngInc), z,
                               rad*Math.cos(ang), rad*Math.sin(ang), z);


                 colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 

                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

                      console.log("Second Z: " + z);

		    
	         ang += teethAngInc;
        }
        z = -z;
   }

   z = -z;
   
   ang = 0;                          // coin edge top

   for (i = 0; i < teethN; i++) {
    
	    var norm = [rad*Math.cos(ang+teethAngInc/2),rad*Math.sin(ang+teethAngInc/2),0];
    
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+teethAngInc),rad*Math.sin(ang+teethAngInc),-z,
               rad*Math.cos(ang+teethAngInc),rad*Math.sin(ang+teethAngInc),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+teethAngInc),rad*Math.sin(ang+teethAngInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        

	    ang += teethAngInc;
   }

   z = -z;
   
   ang = 0;                          // coin edge bottom

   for (i = 0; i < n; i++) {
    
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
    
          
        vertices.push(
               rad*Math.cos(ang)/1.1,rad*Math.sin(ang)/1.1,-z/1.1,
               rad*Math.cos(ang+angInc)/1.1,rad*Math.sin(ang+angInc)/1.1,-z/1.1,
               rad*Math.cos(ang+angInc)/1.1,rad*Math.sin(ang+angInc)/1.1,z/1.1)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang) /1.1,rad*Math.sin(ang) /1.1,-z /1.1,
               rad*Math.cos(ang+angInc) /1.1 ,rad*Math.sin(ang+angInc) /1.1,z/1.1 ,
               rad*Math.cos(ang)/1.1 ,rad*Math.sin(ang)/1.1 ,z /1.1)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        

	    ang += angInc;
   }




   ang = 0;                          // middle edge

   for (i = 0; i < n; i++) {
    
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
    
          
        vertices.push(
               rad*Math.cos(ang)/3,rad*Math.sin(ang)/3,-z/3,
               rad*Math.cos(ang+angInc)/3,rad*Math.sin(ang+angInc)/3,-z/3,
               rad*Math.cos(ang+angInc)/3,rad*Math.sin(ang+angInc)/3,z/3)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang)/3,rad*Math.sin(ang)/3,-z/3,
               rad*Math.cos(ang+angInc)/3,rad*Math.sin(ang+angInc)/3,z/3,
               rad*Math.cos(ang)/3,rad*Math.sin(ang)/3,z/3)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        

	    ang += angInc;
   }





 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < teethN; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var norm = [outRad*Math.cos(ang+teethAngInc/2),outRad*Math.sin(ang+teethAngInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z + 0.050,
              outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),-z + 0.050,
              outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),z - 0.050)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z + 0.050,
              outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),z - 0.050,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z - 0.050)

        colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += teethAngInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < teethN; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		   var normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z ,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),z);

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z + 0.050,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z - 0.050)
               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z - 0.050,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            



           var normal = calcNormal( rad*Math.cos(ang+teethAngInc), rad*Math.sin(ang+teethAngInc),-z,
			                        outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),-z,
				                    outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),z);
				                  
           vertices.push(
               rad*Math.cos(ang+teethAngInc),   rad*Math.sin(ang+teethAngInc),-z,
               outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),-z + 0.050,
               outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),z - 0.050)
               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
               normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])           


           vertices.push(
               rad*Math.cos(ang+teethAngInc),   rad*Math.sin(ang+teethAngInc),-z,
               outRad*Math.cos(ang+teethAngInc),outRad*Math.sin(ang+teethAngInc),z - 0.050,
               rad*Math.cos(ang+teethAngInc),   rad*Math.sin(ang+teethAngInc),z)
            colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
           

		}
	    ang += teethAngInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < spokeN; i++) {   // spark walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
            
		   var normal = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z ,
			                        rad*Math.cos(ang),rad*Math.sin(ang),-z,
				                    rad*Math.cos(ang),rad*Math.sin(ang),z);

           vertices.push(
           rad*Math.cos(ang)/3,rad*Math.sin(ang)/3,z/1.7,
           rad*Math.cos(ang),rad*Math.sin(ang), z,
           rad*Math.cos(ang),rad*Math.sin(ang), -z)
           colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])



           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               rad*Math.cos(ang)/3,   rad*Math.sin(ang)/3, -z/1.7,
               rad*Math.cos(ang)/3,   rad*Math.sin(ang)/3,z /1.7)
               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             



           var normal = calcNormal( rad*Math.cos(ang+spokeAngInc), rad*Math.sin(ang+spokeAngInc),-z,
			                        rad*Math.cos(ang+spokeAngInc),outRad*Math.sin(ang+spokeAngInc),-z,
				                    rad*Math.cos(ang+spokeAngInc),rad*Math.sin(ang+spokeAngInc),z);
				                  
           vertices.push(
               rad*Math.cos(ang+spokeAngInc)/3,   rad*Math.sin(ang+spokeAngInc)/3,z/1.7,
               rad*Math.cos(ang+spokeAngInc),rad*Math.sin(ang+spokeAngInc),z,
               rad*Math.cos(ang+spokeAngInc),rad*Math.sin(ang+spokeAngInc),-z)
               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])          


           vertices.push(
               rad*Math.cos(ang+spokeAngInc),   rad*Math.sin(ang+spokeAngInc),-z,
               rad*Math.cos(ang+spokeAngInc)/3,rad*Math.sin(ang+spokeAngInc)/3,-z/1.7,
               rad*Math.cos(ang+spokeAngInc)/3,   rad*Math.sin(ang+spokeAngInc)/3,z/1.7)
               colors.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5) 
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])               
           

		}
	    ang += spokeAngInc;
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