

/*
numberOfTeeth = the number of teeth the thing will make. Integer value. MINIMUM 3 for good results (Input 1 for some REALLY strange results)
numberOfSpokes = the number of spokes created- integer value
circlizer- higher value makes the surface of most surfaces more circular. MINIMUM 1. Values over 1000 may effect performance
spokeFraction - the spokes take 1/spokefraction of the space from them to the next spoke. Smaller number makes wider spokes, Minimum 2;
spokeZFatness - a double between 1 and 10, determines the z thickness of the spoke
smallCoinFactor - a number between 0 and 1 representing the size of the small innner coin as a fraction of the size of the gear.
red/gren/blue - integer rgb values. 0-255
*/
function createOxfordGear(numberOfTeeth, numberOfSpokes, circlizer, spokeFraction, spokeZFatness, smallCoinFactor, red, green, blue) {
    const vertices = [];
    const colors = [];
    const normals = [];



////////////////////////////
// Making gear triangles
   var r = red/255;
   var g = green/255;
   var b = blue/255;

   var n = numberOfTeeth*2;
   var s = numberOfSpokes;
   var spokeAng = 0;
   var spokeAngInc = 2*Math.PI/s;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2*Math.PI/n;
   var ang = 0;
   var z = 0.1;
   var innerCoinRadius = smallCoinFactor;

   var zspoke = 0;
   if (spokeZFatness > 10){
	   zspoke = .1;
   } else if (spokeZFatness < 1){
	   zspoke = .01;
   } else{
	   zspoke = spokeZFatness/100;
   }
   var circlizer = circlizer;
   var circlizerInc = 2*Math.PI/circlizer;
   var spokeThinner = spokeFraction;
   // if(n < 8){
	//    circlizer = 512;
   // }else if (n < 16){
	//    circlizer = 256;
   // }else if(n < 32){
	//    circlizer = 128;
   // } else {
	//    circlizer = 64;
   // }

   var j;
   var i;



   for ( i = 0; i < s; i++) {   // spoke walls
	   //the bottom
	   var norm = calcNormal(0,0,0,
							 rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,-zspoke,
							 rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,zspoke);

		vertices.push(
			0,0,0,
			rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,-zspoke,
			rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,zspoke);
		colors.push(r,g,b,  r,g,b,  r,g,b)
		normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		//the top
		var norm = calcNormal(0,0,0,
							  rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,zspoke,
							  rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,-zspoke);

		 vertices.push(
			 0,0,0,
			 rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,-zspoke,
			 rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,zspoke);
		 colors.push(r,g,b,  r,g,b,  r,g,b)
		 normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		 //the front
 		var norm = calcNormal(0,0,0,
 							  rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,zspoke,
 							  rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,zspoke);

 		 vertices.push(
 			 0,0,0,
 			 rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,zspoke,
 			 rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,zspoke);
 		 colors.push(r,g,b,  r,g,b,  r,g,b)
 		 normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		 //the back
 		var norm = calcNormal(0,0,0,
 							  rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,zspoke,
 							  rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,zspoke);

 		 vertices.push(
 			 0,0,0,
 			 rad*Math.cos(spokeAng)*.95,rad*Math.sin(spokeAng)*.95,-zspoke,
 			 rad*Math.cos(spokeAng+spokeAngInc/spokeThinner)*.95,rad*Math.sin(spokeAng+spokeAngInc/spokeThinner)*.95,-zspoke);
 		 colors.push(r,g,b,  r,g,b,  r,g,b)
 		 normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2])




  	 spokeAng += spokeAngInc;
   }



   for (i = 0; i < circlizer*n; i++) {//  small coin face, front

         vertices.push(0,0,z*innerCoinRadius,
                       rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,z*innerCoinRadius,
                       rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,z*innerCoinRadius);

         colors.push( r,g,b,  r,g,b,  r,g,b);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
         ang += angInc/circlizer;
   }

   ang = 0;


   ang = 0;   // coin face, back
   for (i = 0; i < circlizer*n; i++) {

         vertices.push(0,0,-z*innerCoinRadius,
                       rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,-z*innerCoinRadius,
                       rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,-z*innerCoinRadius)

         colors.push( r,g,b,  r,g,b,  r,g,b);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc/circlizer;
   }
	//outer coin face front
   for (i = 0; i < circlizer*n; i++) {

         vertices.push(rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,z,
                       rad*Math.cos(ang),rad*Math.sin(ang),z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

         colors.push( r,g,b,  r,g,b,  r,g,b);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );

		 vertices.push(rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,z,
                       rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

         colors.push( r,g,b,  r,g,b,  r,g,b);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );

         ang += angInc/circlizer;
   }

   ang = 0;


   ang = 0;   // coin face, back
   for (i = 0; i < circlizer*n; i++) {

	            vertices.push(rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,-z,
	                          rad*Math.cos(ang),rad*Math.sin(ang),-z,
	                          rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)

	            colors.push( r,g,b,  r,g,b,  r,g,b);
	            //colors.push( 1,0,0,  0,1,0,  0,0,1);
	            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

	   		 vertices.push(rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,-z,
	                          rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,-z,
	                          rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)

	            colors.push( r,g,b,  r,g,b,  r,g,b);
	            //colors.push( 1,0,0,  0,1,0,  0,0,1);
	            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

	            ang += angInc/circlizer;
   }


   ang = 0;                          // coin edge
   var drawTooth = true;
   for (i = 0; i < circlizer*n; i++) {



	   var norm = calcNormal(
 			  rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,-z*innerCoinRadius,
 			  rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,-z*innerCoinRadius,
 			  rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,z*innerCoinRadius);
//small inner coin

 	   vertices.push(
 			  rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,-z*innerCoinRadius,
 			  rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,-z*innerCoinRadius,
 			  rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,z*innerCoinRadius);

 	   colors.push(r,g,b,  r,g,b,  r,g,b);

 	   normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

	   norm = calcNormal(
 			  rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,-z*innerCoinRadius,
 			  rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,z*innerCoinRadius,
 			  rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,z*innerCoinRadius);

 	   vertices.push(
 			  rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,-z*innerCoinRadius,
 			  rad*Math.cos(ang+angInc)*innerCoinRadius,rad*Math.sin(ang+angInc)*innerCoinRadius,z*innerCoinRadius,
 			  rad*Math.cos(ang)*innerCoinRadius,rad*Math.sin(ang)*innerCoinRadius,z*innerCoinRadius);

 	   colors.push(r,g,b,  r,g,b,  r,g,b);
 	   normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

//outer coin edge

	norm = calcNormal(
		rad*Math.cos(ang),rad*Math.sin(ang),-z,
		rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
		rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

		vertices.push(
			rad*Math.cos(ang),rad*Math.sin(ang),-z,
			rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
			rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

		colors.push(r,g,b,  r,g,b,  r,g,b);
		normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

		norm = calcNormal(
			rad*Math.cos(ang),rad*Math.sin(ang),-z,
			rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
			rad*Math.cos(ang),rad*Math.sin(ang),z);
		vertices.push(
			rad*Math.cos(ang),rad*Math.sin(ang),-z,
			rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
			rad*Math.cos(ang),rad*Math.sin(ang),z);

		colors.push(r,g,b,  r,g,b,  r,g,b);
		normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);

//coin rim


	norm =  calcNormal(
		rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,-z,
		rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,-z,
		rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,z);
	vertices.push(
		rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,-z,
		rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,-z,
		rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,z);


	colors.push(r,g,b,  r,g,b,  r,g,b)
	norm[0] = -norm[0];
	norm[1] = -norm[1];
	norm[2] = -norm[2];
	normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

	norm = calcNormal(
		rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,-z,
		rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,z,
		rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,z);
	vertices.push(
		rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,-z,
		rad*Math.cos(ang+angInc)*.9,rad*Math.sin(ang+angInc)*.9,z,
		rad*Math.cos(ang)*.9,rad*Math.sin(ang)*.9,z);

	colors.push(r,g,b,  r,g,b,  r,g,b)
	norm[0] = -norm[0];
	norm[1] = -norm[1];
	norm[2] = -norm[2];
	normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

 	ang += angInc/circlizer;
   }





   for (j = 0; j < 2; j++) {
        ang = 0;
        var drawTooth = false;

        for ( i = 0; i < n; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {

				 var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),z,
										  rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
										  outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3);

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z/3)

                 colors.push(r,g,b,  r,g,b,  r,g,b);

				 if(z<0){
				 	normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
				} else {
					normals.push(-1*norm[0],-1*norm[1],-1*norm[2], -1*norm[0],-1*norm[1],-1*norm[2], -1*norm[0],-1*norm[1],-1*norm[2]);
				}
				 norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),z,
				 						 outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3,
				 						 outRad*Math.cos(ang),outRad*Math.sin(ang),z/3);

                 vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z/3,
                               outRad*Math.cos(ang), outRad*Math.sin(ang), z/3);


                 colors.push(r,g,b,  r,g,b,  r,g,b)

				 if(z<0){
					normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
				} else {
					normals.push(-1*norm[0],-1*norm[1],-1*norm[2], -1*norm[0],-1*norm[1],-1*norm[2], -1*norm[0],-1*norm[1],-1*norm[2]);
				}

		     }
	         ang += angInc;
        }
        z = -z;
   }

   z = -z;




   // ang = 0;                          // coin edge
   // var drawTooth = true;
   // for (i = 0; i < circlizer*n; i++) {
   //      //drawTooth = !drawTooth;
	//     var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
   //      if (drawTooth) {
   //
   //      vertices.push(
   //             rad*Math.cos(ang),rad*Math.sin(ang),-z,
   //             rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
   //             rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);
   //
   //      colors.push(r,g,b,  r,g,b,  r,g,b);
   //      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
   //
   //      vertices.push(
   //             rad*Math.cos(ang),rad*Math.sin(ang),-z,
   //             rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
   //             rad*Math.cos(ang),rad*Math.sin(ang),z);
   //
   //      colors.push(r,g,b,  r,g,b,  r,g,b);
   //      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
   //      }
   //
	//     ang += angInc/circlizer;
   // }


   ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {

        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z/3,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z/3,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3)

        colors.push(r,g,b,  r,g,b,  r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
              outRad*Math.cos(ang),outRad*Math.sin(ang),-z/3,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3,
              outRad*Math.cos(ang),outRad*Math.sin(ang),z/3)

        colors.push(r,g,b,  r,g,b,  r,g,b)
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		}
	    ang += angInc;
   }

   ang = 0;

   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {


		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),z/3,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),z/3,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),-z/3);
		//the square
           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z/3,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z/3,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z/3)
           colors.push(r,g,b,  r,g,b,  r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z/3,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z/3,
               rad*Math.cos(ang),   rad*Math.sin(ang),z/3)
           colors.push(r,g,b,  r,g,b,  r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
//the triangles

		    vertices.push(
			rad*Math.cos(ang),   rad*Math.sin(ang),-z,
			outRad*Math.cos(ang),outRad*Math.sin(ang),-z/3,
			rad*Math.cos(ang),   rad*Math.sin(ang),z/3)
			colors.push(r,g,b,  r,g,b,  r,g,b)
			normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

			vertices.push(
                rad*Math.cos(ang),   rad*Math.sin(ang),z,
                outRad*Math.cos(ang),outRad*Math.sin(ang),z/3,
                rad*Math.cos(ang),   rad*Math.sin(ang),-z/3)
            colors.push(r,g,b,  r,g,b,  r,g,b)
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z/3,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z/3,
				                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3);

           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z/3,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z/3,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3)
           colors.push(r,g,b,  r,g,b,  r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z/3,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z/3)
           colors.push(r,g,b,  r,g,b,  r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		   vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z/3,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z/3)
           colors.push(r,g,b,  r,g,b,  r,g,b)
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

		   vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z/3,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z/3)
           colors.push(r,g,b,  r,g,b,  r,g,b)
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
// for(i = 0; i< s; i++){//spokes
 //    zspoke = -zspoke;
 //    var circAng = 0;
//
//
 //    //create vectors up here
 //    var vec4 = new Learn_webgl_point4();
 //    var v1 = vec4.create(0,0,-zspoke/3);
 //    var v2 = vec4.create(rad*Math.cos(spokeAng),rad*Math.sin(spokeAng),zspoke);
 //    var v3 = vec4.create(rad*Math.cos(spokeAng+spokeAngInc/spokeThinner),rad*Math.sin(spokeAng+spokeAngInc/spokeThinner),zspoke);
//
//
 // 	//rotate that shit here
 //    for (j=0; j < circlizer; j++){
 //    	var mat = new Learn_webgl_matrix();
 //    	var rotateMat = mat.create();
 //    	mat.rotate(rotateMat, circAng,
 // 		 	   rad*Math.cos(spokeAng + (spokeAngInc/(2*spokeThinner))),
 // 			   rad*Math.sin(spokeAng + (spokeAngInc/(2*spokeThinner))), 0);
//
 //    	var newV1 = vec4.create();
 //    	mat.multiplyP4(newV1,rotateMat,v1);
//
 //    	var newV2 = vec4.create();
 //    	mat.multiplyP4(newV2,rotateMat,v2);
//
 //    	var newV3 = vec4.create();
 //    	mat.multiplyP4(newV3,rotateMat,v3);
//
 // 	var norm = calcNormal(newV1[0], newV1[1], newV1[2],
 //                    		  newV2[0], newV2[1], newV2[2],
 //                    		  newV3[0], newV3[1], newV3[2]);
//
 //    	vertices.push( newV1[0], newV1[1], newV1[2],
 //                    newV2[0], newV2[1], newV2[2],
 //                    newV3[0], newV3[1], newV3[2]);
//
// 		colors.push( r,g,b,  r,g,b,  r,g,b);
 // 	if(zspoke>0){
//  		normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]);
 // 	}else {
 // 		normals.push(-norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2], -norm[0],-norm[1],-norm[2]);
 // 	}
//
 // 	circAng += circlizerInc;
//
 //    }
 //  spokeAng += spokeAngInc;
// }
