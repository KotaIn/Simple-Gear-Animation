//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function millerGear(numTeeth, numSpokes) {
    const vertices = [];
    var colors = [];
    const normals = [];

//72.2, 45.1, 20
    colorPrimary = [0.722, 0.451, 0.20];
    colorPrimaryTriangle = [].concat(colorPrimary).concat(colorPrimary).concat(colorPrimary);
    //console.log(colorPrimaryTriangle);


////////////////////////////
// Making gear triangles

   var n = numTeeth * 2;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.1;
   var z_Tooth_Wall = z / 2;

   var i;       //  coin face, front
//    for (i = 0; i < n; i++) {
//    		const innerX = rad*Math.cos(ang);
      
// //          vertices.push(0,0,z,
// //                        innerX,rad*Math.sin(ang),z,
// //                        rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

//          colors = colors.concat(colorPrimaryTriangle);
//          //console.log(colors);
//          //colors.push( 1,0,0,  0,1,0,  0,0,1);
//          normals.push(0,0,1, 0,0,1, 0,0,1  );
//          ang += angInc;
//    }

// 		var hubRad = rad / 3;
// 	   for (var j = 0; j < n; j++) {

//    		const innerX = hubRad*Math.cos(ang);
      
//          vertices.push(0,0,z * 1.01,
//                        innerX,hubRad*Math.sin(ang),z * 1.01,
//                        hubRad*Math.cos(ang+angInc),hubRad*Math.sin(ang+angInc),z * 1.01)

//          colors = colors.concat(colorPrimaryTriangle);
//          normals.push(0,0,1, 0,0,1, 0,0,1  );
//          ang += angInc;
//    }


//    ang = 0;
//    for (i = 0; i < n; i++) {
      

//          var mat = new Learn_webgl_matrix();
//          var rotateMat =  mat.create();
//          mat.rotate(rotateMat, 180, 0,1,0);

//          var vec4 = new Learn_webgl_point4();
//          var v1 = vec4.create(0,0,z);
//          var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
//          var v3 = vec4.create(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

//          var newV1 = vec4.create();   
//          mat.multiplyP4(newV1,rotateMat,v1);

//          var newV2 = vec4.create();   
//          mat.multiplyP4(newV2,rotateMat,v2);

//          var newV3 = vec4.create();   
//          mat.multiplyP4(newV3,rotateMat,v3);                  

//coin face back
//          vertices.push(  newV1[0], newV1[1], newV1[2],  
//                          newV2[0], newV2[1], newV2[2],          
//                          newV3[0], newV3[1], newV3[2]                              
//                        )

         //colors = colors.concat(colorPrimaryTriangle);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         /// AND WE COULD HAVE ROTATED THE NORMALS
         //normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         //ang += angInc;
  // }   

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






 var i;       //  coin face, front
//    for (i = 0; i < n; i++) {
//    		const innerX = rad*Math.cos(ang);
      
//          vertices.push(0,0,z,
//                        innerX,rad*Math.sin(ang),z,
//                        rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

//          colors = colors.concat(colorPrimaryTriangle);
//          console.log(colors);
//          //colors.push( 1,0,0,  0,1,0,  0,0,1);
//          normals.push(0,0,1, 0,0,1, 0,0,1  );
//          ang += angInc;
//    }

//----------------------------------------------------------------------------------------
//    ang = 0;
//    for (i = 0; i < n; i++) {
      

//          var mat = new Learn_webgl_matrix();
//          var rotateMat =  mat.create();
//          mat.rotate(rotateMat, 180, 0,1,0);

//          var vec4 = new Learn_webgl_point4();
//          var v1 = vec4.create(0,0,z);
//          var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
//          var v3 = vec4.create(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

//          var newV1 = vec4.create();   
//          mat.multiplyP4(newV1,rotateMat,v1);

//          var newV2 = vec4.create();   
//          mat.multiplyP4(newV2,rotateMat,v2);

//          var newV3 = vec4.create();   
//          mat.multiplyP4(newV3,rotateMat,v3);                  


//          vertices.push(  newV1[0], newV1[1], newV1[2],  
//                          newV2[0], newV2[1], newV2[2],          
//                          newV3[0], newV3[1], newV3[2]                              
//                        )

//          colors = colors.concat(colorPrimaryTriangle);
//          //colors.push( 1,0,0,  0,1,0,  0,0,1);
//          /// AND WE COULD HAVE ROTATED THE NORMALS
//          normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
//          ang += angInc;
//    }   

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


   var r;
   for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
  
        for ( i = 0; i < numTeeth * 2; i++) {       // face of the teeth
	         drawTooth = !drawTooth;
	         if (drawTooth) {
	        const innerX = rad*Math.cos(ang);
            const innerY = rad*Math.sin(ang);
            const outerX = outRad*Math.cos(ang);
            const outerY = outRad*Math.sin(ang);
            var z_Tooth_Wall_Adj = z_Tooth_Wall;

            if(z < 0) {
            	z_Tooth_Wall_Adj = z_Tooth_Wall_Adj * -1;
            }

			const p1 = [innerX, innerY, z];
			const p2 = [outerX, outerY, z_Tooth_Wall_Adj];
			const p3 = [outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z_Tooth_Wall_Adj];
			const p4 = [ rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z];
//1, 3 , 4
//                  vertices.push(innerX, innerY, z,
//                                rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
//                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z_Tooth_Wall)

				Array.prototype.push.apply(vertices,p1);
				Array.prototype.push.apply(vertices,p3);
				Array.prototype.push.apply(vertices, p4);

				
                 colors = colors.concat(colorPrimaryTriangle);
                  
                 if (z > 0)
                      normals.push(0,0,1, 0,0,1, 0,0,1  );    
                 else
                      normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    

//                  vertices.push(innerX, outerY, z,
//                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z_Tooth_Wall,
//                                outRad*Math.cos(ang), outRad*Math.sin(ang), z_Tooth_Wall);
			

				Array.prototype.push.apply(vertices,p1);
				Array.prototype.push.apply(vertices,p2);
				Array.prototype.push.apply(vertices, p3);

                 colors = colors.concat(colorPrimaryTriangle);

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

   console.log("colors length before coin edge: " + colors.length);
   console.log("normals length before coin edge: " + normals.length);
   console.log("vertices length before coin edge: " + vertices.length);


   
   ang = 0;                          // coin edge
   var drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
            const innerX = rad*Math.cos(ang);
            const innerY = rad*Math.sin(ang);
            const outerX = outRad*Math.cos(ang);
            const outerY = outRad*Math.sin(ang);
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors = colors.concat(colorPrimaryTriangle);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors = colors.concat(colorPrimaryTriangle);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }

   console.log("colors length after coinedge: " + colors.length);
   console.log("normals length after coinedge: " + normals.length);
   console.log("vertices length after coinedge: " + vertices.length);

 ang = 0;
   drawTooth = false;     // tooth roof
   for (i = 0; i < numTeeth * 2; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	    	const innerX = rad * Math.sin(ang);
            const innerY = rad*Math.sin(ang);
            const outerX = outRad*Math.cos(ang);
            const outerY = outRad*Math.sin(ang);
	      
        var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        console.log("tooth roof normOnly" + norm);
//         for(var j = 0; j < norm.length; j++){
//         	norm[j] *= -1;
//         }

		const v1 = [outerX,outerY,-z_Tooth_Wall];
		const v2 = [outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z_Tooth_Wall];
		const v3 = [outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z_Tooth_Wall];

		const calculatedNormal = calcNormal(...v3, ...v2, ...v1);
		console.log("calculated normOnly" + calculatedNormal);
// 		norm = calculatedNormal;

// 		for(var k = 0; k < norm.length; k++){
// 			norm[i] *= -1;
// 		}

        vertices.push(
              outerX,outerY,-z_Tooth_Wall,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z_Tooth_Wall,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z_Tooth_Wall)

        colors = colors.concat(colorPrimaryTriangle);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        
        

        vertices.push(
              outerX,outerY,-z_Tooth_Wall,
              outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z_Tooth_Wall,
              outerX,outerY,z_Tooth_Wall)

        colors = colors.concat(colorPrimaryTriangle);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += angInc;
   }

      console.log("colors length before spokes: " + colors.length);
   console.log("normals length before spokes: " + normals.length);
   console.log("vertices length before spokes: " + vertices.length);

   //spokes
   //

   ang = 0;
   const num_spokes = numSpokes;
   const angIncSpoke = 2 * Math.PI / num_spokes;
	const width = 0.02;
	const radius = rad / 5;
	//radius must be greater than width
	const thetaOffset = Math.asin( width / (2 * radius));
	console.log("thetaOffset is: " + thetaOffset);
	console.log("angIncSpoke is: " + angIncSpoke );
   // spoke walls

   var upper_spokes = [];
   var lower_spokes = [];

   for (i = 0; i < num_spokes; i++) {
   	for(var z_iterant = 0; z_iterant < 2; z_iterant++){ 

			//draw a spoke
			const points = [];
			points [0] = point(rad , ang - thetaOffset / 2, z); 
			points [1] = point(rad, ang + thetaOffset, z);
			points [2] = point(width / 2, ang + Math.PI / 2, z);
			points [3] = point(width / 2, ang - Math.PI / 2, z);

			if(z > 0) {
				upper_spokes.push(points);
				console.log("upper_spokes is: " + upper_spokes);
				console.log("i'th array upper_spokes" + upper_spokes[upper_spokes.length - 1]);
				console.log("upper_spokes length is: " + upper_spokes.length);
			} else {
				lower_spokes.push(points);
				console.log("lower_spokes length is: " + lower_spokes.length);
			}

			console.log(points);
			for(var j = 0; j < 4; j++) {
				console.log("point " + j +" is: " + points[j]);
			}

			if( z > 0){
			pushRectangleVerticesManualy(points, vertices, normals, colors, nTimesArray(4,colorPrimary), -1);
			} else {
				pushRectangleVertices(points, vertices, normals, colors, nTimesArray(4,colorPrimary));	
			}
			

			z*= -1;
	    
   	}
   	ang += angIncSpoke;
   	
   }

        console.log("colors length before spokes: " + colors.length);
   console.log("normals length before spokes: " + normals.length);
   console.log("vertices length before spokes: " + vertices.length);




	//correct for first half of left_rect_points
   //draw spoke sides
   for(var i = 0; i < num_spokes; i++){
   		//i'th spoke upper defining points
   		const upper_points = upper_spokes[i].slice();
   		const lower_points = lower_spokes[i].slice();

   		const left_rect_points = [];
   		left_rect_points.push(upper_points[0]);
   		left_rect_points.push(upper_points[3]);
   		left_rect_points.push(lower_points[3]);
   		left_rect_points.push(lower_points[0]);
   		console.log("left_rect_points is: " + left_rect_points);
   		console.log("left_rect_points at 0 is: " + left_rect_points[0]);


		   		const right_rect_points = [];
//    		right_rect_points.push(lower_points[2]);
//    		right_rect_points.push(lower_points[1]); 
//    		right_rect_points.push(upper_points[1]); 
//    		right_rect_points.push(upper_points[2]); 

   		right_rect_points.push(upper_points[2]);// p3
   		right_rect_points.push(upper_points[1]); //p7
   		
   		right_rect_points.push(lower_points[1]); //p6
   		right_rect_points.push(lower_points[2]); //p2
   		


		//left rect normals must point towards positive x
		//right rect normals must point towards negative x

		//shared indexes : 0, 2
		// 1, 3

   		pushRectangleVerticesManualy(left_rect_points, vertices, normals, colors, nTimesArray(4,colorPrimary), 1);
   		pushRectangleVerticesManualy(right_rect_points, vertices, normals, colors, nTimesArray(4,colorPrimary), 1);

   }

     console.log("colors length before spokes: " + colors.length);
   console.log("normals length before spokes: " + normals.length);
   console.log("vertices length before spokes: " + vertices.length);



   drawTooth = false;
   for ( i = 0; i < numTeeth * 4; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	    	toothWall(ang, rad, outRad, z, z_Tooth_Wall, vertices, normals,colors);
	    	toothWall(ang + angInc, rad, outRad, z, z_Tooth_Wall, vertices, normals,colors);
		}
	    ang += angInc;
   }

    return [vertices,colors,normals];
}




function toothWall(ang, rad, outRad, z, z_Tooth_Wall, vertices, normals,colors){
	        const innerX = rad * Math.cos(ang);
            const innerY = rad*Math.sin(ang);
            const outerX = outRad*Math.cos(ang);
            const outerY = outRad*Math.sin(ang);
            
		   var norm = calcNormal( innerX, innerY,-z,
			                        innerX, innerY,-z_Tooth_Wall,
				                    outerX, outerY,z_Tooth_Wall);
			var triNorm = [].concat(norm).concat(norm).concat(norm);

			const point1 = point(rad, ang, -z);
			const point2 = point(outRad, ang, -z_Tooth_Wall);
			const point3 = point(outRad, ang, z_Tooth_Wall);

			Array.prototype.push.apply(vertices,point1);
			Array.prototype.push.apply(vertices,point2);
			Array.prototype.push.apply(vertices,point3);

// 			console.log("computed point is: " + point1);
// 			console.log("actual point is: " + innerX + ", " + innerY + ", " + -z);
           //vertices.push(
               //innerX, innerY,-z,
               //outerX, outerY,-z_Tooth_Wall,
               //outerX, outerY,z_Tooth_Wall
            //   )
           Array.prototype.push.apply(colors,colorPrimaryTriangle);
           Array.prototype.push.apply(normals, triNorm);


           vertices.push(
               innerX, innerY,-z,
               outerX, outerY, -z_Tooth_Wall,
               innerX, innerY,z)
           Array.prototype.push.apply(colors,colorPrimaryTriangle);
           Array.prototype.push.apply(normals, triNorm);       
}



//returns a point on the circle defined by radius at theta, z
//theta is in radians
function point(radius,theta, z){
	const point = [];
	const x = radius * Math.cos(theta);
	const y = radius * Math.sin(theta);
	console.log("theta is: " + theta);
	console.log("radius is: " + radius);
	console.log("z is: " + z);
	point.push(x);
	point.push(y);
	point.push(z);
	return point;
}


//pushes normal
function pushTriVertices(p1, p2, p3, vertices, normals, colorBuffer, colors_per_vertex){
	Array.prototype.push.apply(vertices, p1);
	Array.prototype.push.apply(vertices, p2);
	Array.prototype.push.apply(vertices, p3);

	if(colors_per_vertex.length != 3 * 3){
		alert("colors_per_vertex was not 3, INVALID STATE");
		console.log("Colors per vertex was: " + colors_per_vertex);
	} 
	Array.prototype.push.apply(colorBuffer, colors_per_vertex)
	

	const normal = calcNormal(
							p1[0], p1[1], p1[2],
							p2[0], p2[1], p2[2],	
							p3[0], p3[1], p3[2]
								
								
								

							);
	const triNorm = triNormCalc(normal);
	if(triNorm[2] > 0) {
		for(var i = 0; i < triNorm.length; i++){
			triNorm[i] *= -1;
		}
	}


// for(var i = 0; i < normal.length;i++){
// 		normal[i] *= -1;
// 	}
	Array.prototype.push.apply(normals, triNorm);
						
}


function pushTriVerticesManually(p1, p2, p3, vertices, normals, colorBuffer, colors_per_vertex, normal_scaler){
	Array.prototype.push.apply(vertices, p1);
	Array.prototype.push.apply(vertices, p2);
	Array.prototype.push.apply(vertices, p3);

	if(colors_per_vertex.length != 3 * 3){
		alert("colors_per_vertex was not 3, INVALID STATE");
		console.log("Colors per vertex was: " + colors_per_vertex);
	} 
	Array.prototype.push.apply(colorBuffer, colors_per_vertex)
	

	const normal = calcNormal(p1[0], p1[1], p1[2],
								p2[0], p2[1], p2[2],
								p3[0], p3[1], p3[2]
							);
							console.log("old normal is: " + normal);
							console.log("source normal for points p1, p2, p3");
							console.log("source normal p1 " + p1);
							console.log("source normal p2 " + p2);
							console.log("source normal p3 " + p3);
// 	for(var i = 0; i < normal.length;i++){
// 		normal[i] *= normal_scaler * -1;
// 	}
	console.log("new normal is: " + normal);
	const triNorm = triNormCalc(normal);

	Array.prototype.push.apply(normals, triNorm);
						
}

//multiplies normal by normal_scaler
//rectangle from first 4 points in points
function pushRectangleVerticesManualy(points, vertices, normals, colorBuffer, colors_per_vertex, normal_scaler){
	//[2], [0] are shared 
	if(points.length != 4){
		alert("points.length != 4, ILLEGAL_STATE");
	}
	const colors_tri_1 = colors_per_vertex.slice();
	colors_tri_1.splice(3 * 3, 1 * 3);

	const colors_tri_2 = colors_per_vertex.slice();
	colors_tri_2.splice(1 * 3, 1 * 3);

	pushTriVerticesManually(points[0], points [1], points [2], vertices, normals, colorBuffer, colors_tri_1, normal_scaler);
	pushTriVerticesManually(points[0], points [2], points [3], vertices, normals, colorBuffer, colors_tri_2, normal_scaler);
// 	for(var i = normals.length - 1; i > normals.length - 9;i++){
// 		normals[i] *= normal_scaler;
// 	}
}

//rectangle from first 4 points in points
function pushRectangleVertices(points, vertices, normals, colorBuffer, colors_per_vertex){
	if(points.length != 4){
		alert("points.length != 4, ILLEGAL_STATE");
	}
// 	const colors_tri_1 = colors_per_vertex.slice();
// 	colors_tri_1.splice(3 * 3, 1 * 3);

// 	const colors_tri_2 = colors_per_vertex.slice();
// 	colors_tri_2.splice(1 * 3, 1 * 3);

// 	pushTriVertices(points[0], points [1], points [2], vertices, normals, colorBuffer, colors_tri_1);
// 	pushTriVertices(points[0], points [2], points [3], vertices, normals, colorBuffer, colors_tri_2);

const p_share_base = points[0];//points.splice(0,1)
const indexes = [1, 2, 3];




var maxDist = -1;
var maxPointIndex = NaN;
//find max distance from p_share_base
for(var i = 1; i < 4; i++){
	console.log("p_share_base is: " + p_share_base);
	console.log("points is: " + points + "after removing p_share_base");
	console.log("points[i] is: " + points[i] + "for i = " + i);
	const dist_for_i = distance(p_share_base,points[i]);
	if(dist_for_i > maxDist){
		maxDist = dist_for_i;
		maxPointIndex = i;
	}
}



//set other shared point to maxDist point relative base point
const p_share_other = points[maxPointIndex];
const finIndexes = indexes.filter(num => num != maxPointIndex);

	//incorrect color assignment
	const colors_tri_1 = colors_per_vertex.slice();
	colors_tri_1.splice(3 * 3, 1 * 3);

	//incorrect color assignment
	const colors_tri_2 = colors_per_vertex.slice();
	colors_tri_2.splice(1 * 3, 1 * 3);


	pushTriVertices(p_share_base, p_share_other, points [finIndexes[0]], vertices, normals, colorBuffer, colors_tri_1);
	pushTriVertices(p_share_base, p_share_other, points [finIndexes[1]], vertices, normals, colorBuffer, colors_tri_2);










}


//distance between 2,   3D points
function distance(p1, p2){
	var result = 0;
	for(var i = 0; i < 3; i++){
		result +=  Math.pow( p1[i] - p2[i], 2);
	}
	return result;
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

//returns tripled array
function triNormCalc(normal){
	return normal.concat(normal).concat(normal);
}

//returns an array concated to itself n times
function nTimesArray(n, array){
	var result = [];
	for(var i = 0; i < n;i++){
		result = result.concat(array);
	}
	return result;
}