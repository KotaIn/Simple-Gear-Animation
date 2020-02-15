//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function inoueGear() {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

   var n = 40;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2 * 3.14159 / n;
   var ang = 0;
   var z = 0.1;
   //var test = -0.08;
   var tanAng = 3.14159 / 6;
   //var tanAng = 3.14159 / 10;

   var i;       //  coin face, front
   for (i = 0; i < n; i++) {      
         vertices.push(0 , 0, z,
                       rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, z,
                       rad * Math.cos(ang + angInc) * 0.3, rad * Math.sin(ang + angInc) * 0.3, z)


//          var normal = calcNormal(0 , 0, z,
//                        rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, z,
//                        rad * Math.cos(ang + angInc) * 0.3, rad * Math.sin(ang + angInc) * 0.3, z)

         colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
//          colors.push( 1,0,0,  0,1,0,  0,0,1);
			normals.push(0,0,1, 0,0,1, 0,0,1);
//          normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2]);
         ang += angInc;
   }

   ang = 0;   // coin face, back
   for (i = 0; i < n; i++) {    
         vertices.push(0, 0, -z,
                       rad*Math.cos(ang) * 0.3, rad*Math.sin(ang) * 0.3, -z,
                       rad*Math.cos(ang+angInc) * 0.3, rad*Math.sin(ang+angInc) * 0.3, -z)

         colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1);
//          normals.push(normal[0],normal[1],-normal[2], normal[0],normal[1],-normal[2], normal[0],normal[1],-normal[2]);
         ang += angInc;
   }
  

   ang = 0;    // innner coin edge
   var drawEdge = true;
   for (i = 0; i < n; i++) {
        drawEdge = !drawEdge;
	    var norm = [rad * Math.cos(ang + angInc / 2) * 0.3, rad*Math.sin(ang + angInc / 2) * 0.3, 0];
	    
        if (drawEdge) {
          
        vertices.push(
               rad*Math.cos(ang) * 0.3, rad*Math.sin(ang) * 0.3, -z,
               rad*Math.cos(ang+angInc) * 0.3, rad*Math.sin(ang+angInc) * 0.3, -z,
               rad*Math.cos(ang+angInc) * 0.3, rad*Math.sin(ang+angInc) * 0.3, z)

        colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang) * 0.3, rad*Math.sin(ang) * 0.3, -z,
               rad*Math.cos(ang+angInc) * 0.3, rad*Math.sin(ang+angInc) * 0.3, z,
               rad*Math.cos(ang) * 0.3, rad*Math.sin(ang) * 0.3, z)

        colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }

//////////////////////////////////////////////////////////////////////
   for (i = 0; i < n; i++) { // coin out face
      
         vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                       rad*Math.cos(ang) * 0.8, rad*Math.sin(ang) * 0.8, z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z)

         colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,1, 0,0,1, 0,0,1);

         vertices.push(rad*Math.cos(ang+angInc) * 0.8, rad*Math.sin(ang+angInc) * 0.8, z,
                       rad*Math.cos(ang) * 0.8, rad*Math.sin(ang) * 0.8, z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z)
         colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,1, 0,0,1, 0,0,1);
         ang += angInc;
   }

   ang = 0;   // coin outer face, back
   for (i = 0; i < n; i++) {    
         vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                       rad*Math.cos(ang) * 0.8, rad*Math.sin(ang) * 0.8, -z,
                       rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z)

         colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1);

         vertices.push(rad*Math.cos(ang+angInc) * 0.8, rad * Math.sin(ang+angInc) * 0.8, -z,
                       rad*Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, -z,
                       rad*Math.cos(ang+angInc), rad * Math.sin(ang+angInc), -z)
         colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1);
         ang += angInc;
   }

   ang = 0;   // out-in coin edge
   drawEdge = true;
   for (i = 0; i < n; i++) {
        drawEdge = !drawEdge;
	    var norm = [rad*Math.cos(ang + angInc / 2) * 0.8, rad*Math.sin(ang + angInc / 2) * 0.8, 0];
        if (drawEdge) {
          
			vertices.push(
				   rad*Math.cos(ang) * 0.8, rad*Math.sin(ang) * 0.8, -z,
				   rad*Math.cos(ang+angInc) * 0.8, rad*Math.sin(ang+angInc) * 0.8, -z,
				   rad*Math.cos(ang+angInc) * 0.8, rad*Math.sin(ang+angInc) * 0.8, z)

			colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
			normals.push(-norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2])

			vertices.push(
				   rad*Math.cos(ang) * 0.8, rad*Math.sin(ang) * 0.8, -z,
				   rad*Math.cos(ang+angInc) * 0.8, rad*Math.sin(ang+angInc) * 0.8, z,
				   rad*Math.cos(ang) * 0.8, rad*Math.sin(ang) * 0.8, z)

			colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
			normals.push(-norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2])            
        }

	    ang += angInc;
   }


   ang = 0;  // coin out edge
   drawEdge = true;
   for (i = 0; i < n; i++) {
        drawEdge = !drawEdge;
	    var norm = [rad * Math.cos(ang+angInc/2),rad * Math.sin(ang + angInc / 2), 0];
        if (drawEdge) {
          
			vertices.push(
				   rad*Math.cos(ang), rad * Math.sin(ang), -z,
				   rad*Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
				   rad*Math.cos(ang + angInc),rad * Math.sin(ang + angInc), z)

			colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

			vertices.push(
				   rad*Math.cos(ang), rad * Math.sin(ang), -z,
				   rad*Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
				   rad*Math.cos(ang), rad * Math.sin(ang), z)

			colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }
/////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////

   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
   		var drawSpoke = false;
        for ( i = 0; i < n; i++) {       // face of the spoke
			drawSpoke = !drawSpoke
			if(drawSpoke){
				vertices.push(rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, z,
							   rad * Math.cos(ang + angInc) * 0.8, rad * Math.sin(ang + angInc) * 0.8, z,
							   rad * Math.cos(ang + angInc) * 0.3, rad * Math.sin(ang + angInc) * 0.3, z) 

				 colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)

				 if (z > 0)
					  normals.push(0,0,1, 0,0,1, 0,0,1);    
				 else
					  normals.push(0,0,-1, 0,0,-1, 0,0,-1);    

				 vertices.push(rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, z,
							   rad * Math.cos(ang + angInc) * 0.8, rad * Math.sin(ang + angInc) * 0.8, z,
							   rad * Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, z);


				 colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75) 

				 if (z > 0)
					  normals.push(0,0,1, 0,0,1, 0,0,1);    
				 else
					  normals.push(0,0,-1, 0,0,-1, 0,0,-1);  
			}
			ang += angInc;
        
	    }
        z = -z;
   }


   ang = 0;
   drawSpoke = false;
   for ( i = 0; i < n; i++) {   // spoke walls
       drawSpoke = !drawSpoke
       if(drawSpoke){
		   var normal = calcNormal( rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, -z,
									rad * Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, -z,
									rad * Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, z);

		   vertices.push(
			   rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, -z,
			   rad * Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, -z,
			   rad * Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, z)
		   colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
		   normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])


		   vertices.push(
			   rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, -z,
			   rad * Math.cos(ang) * 0.3, rad * Math.sin(ang) * 0.3, z,
			   rad * Math.cos(ang) * 0.8, rad * Math.sin(ang) * 0.8, z)
		   colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
		   normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])             



		   normal = calcNormal( rad * Math.cos(ang+angInc) * 0.3, rad * Math.sin(ang+angInc) * 0.3, -z,
								rad * Math.cos(ang+angInc) * 0.8, rad*Math.sin(ang+angInc) * 0.8, -z,
								rad * Math.cos(ang+angInc) * 0.8, rad*Math.sin(ang+angInc) * 0.8, z);

		   vertices.push(
			   rad * Math.cos(ang + angInc) * 0.3, rad * Math.sin(ang + angInc) * 0.3, -z,
			   rad * Math.cos(ang + angInc) * 0.8, rad * Math.sin(ang + angInc) * 0.8, -z,
			   rad * Math.cos(ang + angInc) * 0.8, rad * Math.sin(ang + angInc) * 0.8, z)
		   colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
		   normals.push(-normal[0],-normal[1],normal[2], -normal[0],-normal[1],normal[2], -normal[0],-normal[1],normal[2])             

		   vertices.push(
			   rad * Math.cos(ang + angInc) * 0.3, rad * Math.sin(ang + angInc) * 0.3, -z,
			   rad * Math.cos(ang + angInc) * 0.8, rad * Math.sin(ang + angInc) * 0.8, z,
			   rad * Math.cos(ang + angInc) * 0.3, rad * Math.sin(ang + angInc) * 0.3, z)
		   colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
		   normals.push(-normal[0],-normal[1],normal[2], -normal[0],-normal[1],normal[2], -normal[0],-normal[1],normal[2]) 
       }

	   ang += angInc;
   }

////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////

   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

	         	 var normal = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               			 rad*Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                                		 outRad*Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng))

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                               outRad*Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng))

                 colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
                  
                 if (z > 0){
                 	normals.push(normal[0],normal[1],-normal[2], normal[0],normal[1],-normal[2], normal[0],normal[1],-normal[2])  
                 }   
                 else{
                 	normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])  
                  }
                    

                 vertices.push(rad*Math.cos(ang), rad * Math.sin(ang), z,
                               outRad*Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng),
                               outRad*Math.cos(ang), outRad * Math.sin(ang), z*Math.tan(tanAng));


                 colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75) 

                 var normal = calcNormal(rad*Math.cos(ang), rad * Math.sin(ang), z,
                               outRad*Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng),
                               outRad*Math.cos(ang), outRad * Math.sin(ang), z*Math.tan(tanAng))

                 if (z > 0){
                 	normals.push(normal[0],normal[1],-normal[2], normal[0],normal[1], -normal[2], normal[0],normal[1], -normal[2])  
                 }   
                 else{
                 	normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1], normal[2])  
                 }

		     }
	         ang += angInc;
        }
        z = -z;
        //tanAng = - tanAng;
   }

   z = -z;

   ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
        var normal = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
        vertices.push(
              outRad * Math.cos(ang), outRad * Math.sin(ang), -z*Math.tan(tanAng),
              outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z*Math.tan(tanAng),
              outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng))

        colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])


        vertices.push(
              outRad * Math.cos(ang), outRad * Math.sin(ang), -z*Math.tan(tanAng),
              outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng),
              outRad * Math.cos(ang), outRad * Math.sin(ang), z*Math.tan(tanAng))

        colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])             

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
            
		   var nor = calcNormal( rad * Math.cos(ang), rad*Math.sin(ang), -z,
			                        outRad * Math.cos(ang), outRad*Math.sin(ang), -z*Math.tan(tanAng),
				                    outRad * Math.cos(ang), outRad*Math.sin(ang), z*Math.tan(tanAng));

           vertices.push(
               rad * Math.cos(ang),   rad * Math.sin(ang),-z,
               outRad * Math.cos(ang), outRad * Math.sin(ang), -z*Math.tan(tanAng),
               outRad * Math.cos(ang), outRad * Math.sin(ang), z*Math.tan(tanAng))
           colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(-norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2])


           vertices.push(
               rad * Math.cos(ang),   rad * Math.sin(ang), -z,
               outRad * Math.cos(ang), outRad * Math.sin(ang),z*Math.tan(tanAng),
               rad * Math.cos(ang),   rad * Math.sin(ang), z)
           colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(-norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2], -norm[0],-norm[1],norm[2])             



           var norm = calcNormal( rad * Math.cos(ang + angInc), rad * Math.sin(ang+angInc),-z,
			                        outRad * Math.cos(ang + angInc), outRad*Math.sin(ang+angInc),-z*Math.tan(tanAng),
				                    outRad * Math.cos(ang + angInc), outRad*Math.sin(ang+angInc),z*Math.tan(tanAng));
				                  
           vertices.push(
               rad * Math.cos(ang + angInc),   rad * Math.sin(ang + angInc), -z,
               outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z*Math.tan(tanAng),
               outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng))
           colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
               outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z*Math.tan(tanAng),
               rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
           colors.push(0.75,0.75,0.75,  0.75,0.75,0.75,  0.75,0.75,0.75)
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