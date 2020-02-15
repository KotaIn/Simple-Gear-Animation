//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function createtommypGear() {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = 42;
   var numberOfSpokes = 6;  // MUST BE A FACTOR OF N
   var centerRad = 0.1;	// radius for hole inner edge
   var innerRad = 0.2;	// radius for hole outer edge
   var rad2 = 0.8;			// radius for wheel inner edge
   var rad = 1;				//	radius for wheel outer edge
   var outRad = rad * 1.15;		// radius for tooth edge
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.1;				// thickness of gear
	var toothRad = 0.45; // shrink rate of tooth roof
	var red = 1;
	var green = 0.84;
	var blue = 0;
	
   
   
   var i;

   // wheel center outward edge
  ang = 0; 
   for (i = 0; i < n*10; i++) {
	    var norm = [innerRad*Math.cos(ang+angInc/2),innerRad*Math.sin(ang+angInc/2),0];

        vertices.push(
               innerRad*Math.cos(ang),innerRad*Math.sin(ang),-z,
               innerRad*Math.cos(ang+angInc),innerRad*Math.sin(ang+angInc),-z,
               innerRad*Math.cos(ang+angInc),innerRad*Math.sin(ang+angInc),z)

		colors.push( red, green, blue,  red, green, blue,  red, green, blue);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               innerRad*Math.cos(ang),innerRad*Math.sin(ang),-z,
               innerRad*Math.cos(ang+angInc),innerRad*Math.sin(ang+angInc),z,
               innerRad*Math.cos(ang),innerRad*Math.sin(ang),z)
		
		colors.push( red, green, blue,  red, green, blue,  red, green, blue);
        
		normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            


	    ang += angInc/10;
   }
   
   //  spokes
   for (i = 0; i < n; i++) {
		if (i % Math.round(n/numberOfSpokes) === 0) {
			
			// front
			vertices.push(innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), z,
                       rad2*Math.cos(ang), rad2*Math.sin(ang), z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,1, 0,0,1, 0,0,1  );
			 
			 vertices.push(innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,1, 0,0,1, 0,0,1  );
			 
			 // back
			vertices.push(innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), -z,
                       rad2*Math.cos(ang), rad2*Math.sin(ang), -z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), -z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
			 
			 vertices.push(innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), -z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), -z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
			 
			 // right side
			 vertices.push(innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), -z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), z,
                       innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			var norm = calcNormal(innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), -z,
                    rad2*Math.cos(ang+angInc),  rad2*Math.sin(ang+angInc), z,
                    innerRad*Math.cos(ang+2*angInc),  innerRad*Math.sin(ang+2*angInc), z);
			 normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );
			 
			 vertices.push(innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), -z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), -z,
                       rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			norm = calcNormal(innerRad*Math.cos(ang+2*angInc), innerRad*Math.sin(ang+2*angInc), -z,
                    rad2*Math.cos(ang+angInc),  rad2*Math.sin(ang+angInc), -z,
                    rad2*Math.cos(ang+angInc),  rad2*Math.sin(ang+angInc), z);
			 normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );
			 
			 // left side
			 vertices.push(rad2*Math.cos(ang), rad2*Math.sin(ang), z,
                       rad2*Math.cos(ang), rad2*Math.sin(ang), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			norm = calcNormal(rad2*Math.cos(ang), rad2*Math.sin(ang), z,
                       rad2*Math.cos(ang), rad2*Math.sin(ang), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), z);
			 normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );
			 
			 vertices.push(rad2*Math.cos(ang), rad2*Math.sin(ang), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			norm = calcNormal(rad2*Math.cos(ang), rad2*Math.sin(ang), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), -z,
                       innerRad*Math.cos(ang-angInc), innerRad*Math.sin(ang-angInc), z);
			 normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );
			 
		}
			ang += angInc;
		
   }
   
    //  outer ring faces
   for (i = 0; i < n; i++) {
			
			// front
			vertices.push(rad2*Math.cos(ang), rad2*Math.sin(ang), z,
                       rad*Math.cos(ang), rad*Math.sin(ang), z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,1, 0,0,1, 0,0,1  );
			 
			 vertices.push(rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                       rad2*Math.cos(ang), rad2*Math.sin(ang), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,1, 0,0,1, 0,0,1  );
			 
			 // back
			vertices.push(rad2*Math.cos(ang), rad2*Math.sin(ang), -z,
                       rad*Math.cos(ang), rad*Math.sin(ang), -z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
			 
			 vertices.push(rad2*Math.cos(ang+angInc), rad2*Math.sin(ang+angInc), -z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z,
                       rad2*Math.cos(ang), rad2*Math.sin(ang), -z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
			 
			ang += angInc;
		
   }
   
       //  inner ring faces
   for (i = 0; i < n; i++) {
			
			// front
			vertices.push(centerRad*Math.cos(ang), centerRad*Math.sin(ang), z,
                       innerRad*Math.cos(ang), innerRad*Math.sin(ang), z,
                       innerRad*Math.cos(ang+angInc), innerRad*Math.sin(ang+angInc), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,1, 0,0,1, 0,0,1  );
			 
			 vertices.push(centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc), z,
                       innerRad*Math.cos(ang+angInc), innerRad*Math.sin(ang+angInc), z,
                       centerRad*Math.cos(ang), centerRad*Math.sin(ang), z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,1, 0,0,1, 0,0,1  );
			 
			 // back
			vertices.push(centerRad*Math.cos(ang), centerRad*Math.sin(ang), -z,
                       innerRad*Math.cos(ang), innerRad*Math.sin(ang), -z,
                       innerRad*Math.cos(ang+angInc), innerRad*Math.sin(ang+angInc), -z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			 normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
			 
			 vertices.push(centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc), -z,
                       innerRad*Math.cos(ang+angInc), innerRad*Math.sin(ang+angInc), -z,
                       centerRad*Math.cos(ang), centerRad*Math.sin(ang), -z);
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
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

				// front
                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z*toothRad)

				colors.push( red, green, blue,  red, green, blue,  red, green, blue);
                  
				var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
					outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z*toothRad,
					rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z );
				normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z*toothRad,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), z*toothRad);

                colors.push( red, green, blue,  red, green, blue,  red, green, blue);
				
				norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                    outRad*Math.cos(ang), outRad*Math.sin(ang), z*toothRad,
					outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z*toothRad );
				normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );
				
				// back
				 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), -z*toothRad,
							   outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -z*toothRad );

                colors.push( red, green, blue,  red, green, blue,  red, green, blue);
				
				norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                    outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -z*toothRad,
					outRad*Math.cos(ang), outRad*Math.sin(ang), -z*toothRad );
				normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );
				
				vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
							   outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -z*toothRad,
							   rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z);

                colors.push( red, green, blue,  red, green, blue,  red, green, blue);
				
				norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                    rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z,
					outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -z*toothRad );
				normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]  );


		     }
	         ang += angInc;
        }
		
   }

   z = -z;



   // coin edge
   ang = 0;                    
   var drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
			vertices.push(
				   rad*Math.cos(ang),rad*Math.sin(ang),-z,
				   rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
				   rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)
			
		   colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

			vertices.push(
				   rad*Math.cos(ang),rad*Math.sin(ang),-z,
				   rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
				   rad*Math.cos(ang),rad*Math.sin(ang),z)
			
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }
   
   
   
      // inner coin edge
   ang = 0;                    

   for (i = 0; i < n*10; i++) {

	    var norm = [-rad2*Math.cos(ang+angInc/2),-rad2*Math.sin(ang+angInc/2),0];

			vertices.push(
				   rad2*Math.cos(ang),rad2*Math.sin(ang),-z,
				   rad2*Math.cos(ang+angInc),rad2*Math.sin(ang+angInc),-z,
				   rad2*Math.cos(ang+angInc),rad2*Math.sin(ang+angInc),z)
			
		   colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

			vertices.push(
				   rad2*Math.cos(ang),rad2*Math.sin(ang),-z,
				   rad2*Math.cos(ang+angInc),rad2*Math.sin(ang+angInc),z,
				   rad2*Math.cos(ang),rad2*Math.sin(ang),z)
			
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        

	    ang += angInc/10;
   }

   
	 // center hole edge
   ang = 0;                    

   for (i = 0; i < n*10; i++) {

	    var norm = [-centerRad*Math.cos(ang+angInc/2),-centerRad*Math.sin(ang+angInc/2),0];

			vertices.push(
				   centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
				   centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z,
				   centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z)
			
		   colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

			vertices.push(
				   centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
				   centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z,
				   centerRad*Math.cos(ang),centerRad*Math.sin(ang),z)
			
			colors.push( red, green, blue,  red, green, blue,  red, green, blue);
			
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        

	    ang += angInc/10;
   }

 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z*toothRad,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z*toothRad,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z*toothRad)
		
		colors.push( red, green, blue,  red, green, blue,  red, green, blue);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z*toothRad,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z*toothRad,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z*toothRad)

		colors.push( red, green, blue,  red, green, blue,  red, green, blue);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {

           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z*toothRad,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z*toothRad)
			   
        colors.push( red, green, blue,  red, green, blue,  red, green, blue);
		//colors.push(1,0,0,1,0,0,1,0,0);
		
		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
							outRad*Math.cos(ang),outRad*Math.sin(ang),-z*toothRad,
							outRad*Math.cos(ang),outRad*Math.sin(ang),z*toothRad);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z*toothRad,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
        colors.push( red, green, blue,  red, green, blue,  red, green, blue);
		//colors.push(1,0,0,1,0,0,1,0,0);
		
		norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
							outRad*Math.cos(ang),outRad*Math.sin(ang),-z*toothRad,
							rad*Math.cos(ang),   rad*Math.sin(ang),z);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

				                  
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z*toothRad,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z*toothRad)
           colors.push( red, green, blue,  red, green, blue,  red, green, blue);
		   
		  norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
						outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z*toothRad,
						outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z*toothRad);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z*toothRad,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
           colors.push( red, green, blue,  red, green, blue,  red, green, blue);
		   
		   norm = calcNormal( rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
							outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z*toothRad,
							rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z);
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