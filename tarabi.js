/*
 * Abderisaq Tarabi
 * TCSS 458 A
 * Homework 4
 * 02/25/2019
 * 
 */

//build the object, including geometry (triangle vertices)
//and possibly colors and normals for each vertex
function tarabiGear(numTeeth, numSpokess) {
	
	const vertices = [];
	const colors = [];
	const normals = [];
	

	var n = numTeeth * 2;
	var numSpokes = Math.round(n / numSpokess);
	
	// The color of the gear.
	var rgb = [128/255,128/255,128/255];
	var color = [rgb[0],rgb[1],rgb[2], rgb[0],rgb[1],rgb[2], rgb[0],rgb[1],rgb[2]];

	var rad = 1.0;
	var outRad = rad * 1.2;
	var angInc = 2*3.14159/n;
	var ang = 0;
	var z = 0.1;

	// The angle of teeth in which the slides slant inward toward each other.
	var inWard = 3;


	// The Spokes ================================================================================

	var innerRad = 0.3;
	var outerRad = 0.8;

	var p1 = {x: innerRad, y: innerRad, z: 1};
	var p2 = {x: innerRad, y: innerRad, z: 1};
	var p3 = {x: outerRad, y: outerRad, z: 1};
	var p4 = {x: innerRad, y: innerRad, z: 1};
	var p5 = {x: outerRad, y: outerRad, z: 1};
	var p6 = {x: outerRad, y: outerRad, z: 1};
	
	// Face of the spokes
	calcFace(vertices, colors, normals, color, n, numSpokes, angInc, z, p1, p2, p3, p4, p5, p6);


	var p1 = {x: innerRad, y: innerRad, z: 1};
	var p2 = {x: outerRad, y: outerRad, z: 1};
	var p3 = {x: outerRad, y: outerRad, z: 1};
	var p4 = {x: innerRad, y: innerRad, z: 1};
	var p5 = {x: outerRad, y: outerRad, z: 1};
	var p6 = {x: innerRad, y: innerRad, z: 1};
	
	// The walls of the spokes
	calcWalls(vertices, colors, normals, color, n, numSpokes, angInc, z, p1, p2, p3, p4, p5, p6);


	
	// The Big Hollow Circle ======================================================================

	var innerRad = 0.8;
	var outerRad = rad;

	var p1 = {x: innerRad, y: innerRad, z: 1};
	var p2 = {x: innerRad, y: innerRad, z: 1};
	var p3 = {x: outerRad, y: outerRad, z: 1};
	var p4 = {x: innerRad, y: innerRad, z: 1};
	var p5 = {x: outerRad, y: outerRad, z: 1};
	var p6 = {x: outerRad, y: outerRad, z: 1};

	// Face of the big hollow circle
	calcFace(vertices, colors, normals, color, n, 1, angInc, z, p1, p2, p3, p4, p5, p6);

	// Hallow big hollow circle edges
	calcEdges(vertices, colors, normals, color, n, 1, innerRad, angInc, z);


	

	// The Small Hollow Circle ======================================================================

	var innerRad = 0.1;
	var outerRad = 0.3;

	var p1 = {x: innerRad, y: innerRad, z: 1};
	var p2 = {x: innerRad, y: innerRad, z: 1};
	var p3 = {x: outerRad, y: outerRad, z: 1};
	var p4 = {x: innerRad, y: innerRad, z: 1};
	var p5 = {x: outerRad, y: outerRad, z: 1};
	var p6 = {x: outerRad, y: outerRad, z: 1};
	
	// Face of the small hollow circle
	calcFace(vertices, colors, normals, color, n, 1, angInc, z, p1, p2, p3, p4, p5, p6);

	// Hallow small circle inner edges
	calcEdges(vertices, colors, normals, color, n, 1, innerRad, angInc, z);

	// Hallow small circle outer edges
	calcEdges(vertices, colors, normals, color, n, 1, outerRad, angInc, z);


	

	// The Teeth ================================================================================

	var p1 = {x: rad, y: rad, z: 1};
	var p2 = {x: rad, y: rad, z: 1};
	var p3 = {x: outRad, y: outRad, z: inWard};
	var p4 = {x: rad, y: rad, z: 1};
	var p5 = {x: outRad, y: outRad, z: inWard};
	var p6 = {x: outRad, y: outRad, z: inWard};

	// Face of the teeth
	calcFace(vertices, colors, normals, color, n, 2, angInc, z, p1, p2, p3, p4, p5, p6);

	// The coin edge
	calcEdges(vertices, colors, normals, color, n, 1, rad, angInc, z);

	// The coin roof
	calcEdges(vertices, colors, normals, color, n, 2, outRad, angInc, z / inWard);

	var p1 = {x: rad, y: rad, z: 1};
	var p2 = {x: outRad, y: outRad, z: inWard};
	var p3 = {x: outRad, y: outRad, z: inWard};
	var p4 = {x: rad, y: rad, z: 1};
	var p5 = {x: outRad, y: outRad, z: inWard};
	var p6 = {x: rad, y: rad, z: 1};
	
	// The teeth walls
	calcWalls(vertices, colors, normals, color, n, 2, angInc, z, p1, p2, p3, p4, p5, p6);
	

	

	// Return the three arrays that contains vertices, colors and normals.
	return [vertices, colors, normals]
}



//Method to calculate the faces.
function calcFace(vertices, colors, normals, c, area, numTeeth, angle, z, p1, p2, p3, p4, p5, p6) {

	var count = 1;
	var ang = 0;
	var zz = z;

	do {

		ang = 0;
		for (var i = 0; i < area; i++) {

			if (i % numTeeth == 0) {

				vertices.push(p1.x * Math.cos(ang), p1.y * Math.sin(ang), zz / p1.z, 
						p2.x * Math.cos(ang + angle), p2.y * Math.sin(ang + angle), zz / p2.z, 
						p3.x * Math.cos(ang + angle), p3.y * Math.sin(ang + angle), zz / p3.z);

				colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);

				if (zz > 0) normals.push(0,0,1, 0,0,1, 0,0,1);    
				else normals.push(0,0,-1, 0,0,-1, 0,0,-1);    

				vertices.push(p4.x * Math.cos(ang), p4.y * Math.sin(ang), zz / p4.z, 
						p5.x * Math.cos(ang + angle), p5.y * Math.sin(ang + angle), zz / p5.z, 
						p6.x * Math.cos(ang), p6.y * Math.sin(ang), zz / p6.z);

				colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);

				if (zz > 0) normals.push(0,0,1, 0,0,1, 0,0,1);    
				else normals.push(0,0,-1, 0,0,-1, 0,0,-1);  

			}
			ang += angle;
		}
		zz = -zz;

	} while (count++ < 2);

}

//Method to calculate the edges.
function calcEdges(vertices, colors, normals, c, area, numTeeth, angle1, angle2, z) {

	var ang = 0;

	for (var i = 0; i < area; i++) {

		if (i % numTeeth == 0) {

			var n = [angle1 * Math.cos(ang + angle2 / 2), angle1 * Math.sin(ang + angle2 / 2), 0];


			vertices.push(angle1 * Math.cos(ang), angle1 * Math.sin(ang), -z,
					angle1 * Math.cos(ang + angle2), angle1 * Math.sin(ang + angle2), -z,
					angle1 * Math.cos(ang + angle2), angle1 * Math.sin(ang + angle2), z);

			colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);
			normals.push(n[0],n[1],n[2], n[0],n[1],n[2], n[0],n[1],n[2]);

			vertices.push(angle1 * Math.cos(ang), angle1 * Math.sin(ang), -z,
					angle1 * Math.cos(ang + angle2), angle1 * Math.sin(ang + angle2), z,
					angle1 * Math.cos(ang), angle1 * Math.sin(ang), z);

			colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);
			normals.push(n[0],n[1],n[2], n[0],n[1],n[2], n[0],n[1],n[2]);            


		}
		ang += angle2;
	}

}

//Method to calculate the walls.
function calcWalls(vertices, colors, normals, c, area, numTeeth, angle, z, p1, p2, p3, p4, p5, p6) {
	
	var ang = 0;
	for (var i = 0; i < area; i++) {

		if (i % numTeeth == 0) {

			var n = calcNormal(p1.x * Math.cos(ang), p1.y * Math.sin(ang), -z,
					p2.x * Math.cos(ang), p2.y * Math.sin(ang), -z,
					p3.x * Math.cos(ang), p3.y * Math.sin(ang), z);

			vertices.push(p1.x * Math.cos(ang), p1.y * Math.sin(ang), -z,
					p2.x * Math.cos(ang), p2.y * Math.sin(ang), -z / p2.z,
					p3.x * Math.cos(ang), p3.y * Math.sin(ang), z / p3.z);
			colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);
			normals.push(n[0],n[1],n[2], n[0],n[1],n[2], n[0],n[1],n[2]);


			vertices.push(p4.x * Math.cos(ang), p4.y * Math.sin(ang), -z,
					p5.x * Math.cos(ang), p5.y * Math.sin(ang), z / p5.z,
					p6.x * Math.cos(ang), p6.y * Math.sin(ang), z);
			colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);
			normals.push(n[0],n[1],n[2], n[0],n[1],n[2], n[0],n[1],n[2]);


			n = calcNormal(p1.x * Math.cos(ang + angle), p1.y * Math.sin(ang + angle), -z,
					p2.x * Math.cos(ang + angle), p2.y * Math.sin(ang + angle), -z,
					p3.x * Math.cos(ang + angle), p3.y * Math.sin(ang + angle), z);

			vertices.push(p1.x * Math.cos(ang + angle), p1.y * Math.sin(ang + angle), -z,
					p2.x * Math.cos(ang + angle), p2.y * Math.sin(ang + angle), -z / p2.z,
					p3.x * Math.cos(ang + angle), p3.y * Math.sin(ang + angle), z / p3.z);
			colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);
			normals.push(n[0],n[1],n[2], n[0],n[1],n[2], n[0],n[1],n[2]);


			vertices.push(p4.x * Math.cos(ang + angle), p4.y * Math.sin(ang + angle), -z,
					p5.x * Math.cos(ang + angle), p5.y * Math.sin(ang + angle), z / p5.z,
					p6.x * Math.cos(ang + angle), p6.y * Math.sin(ang + angle), z);
			colors.push(c[0],c[1],c[2], c[3],c[4],c[5], c[6],c[7],c[8]);
			normals.push(n[0],n[1],n[2], n[0],n[1],n[2], n[0],n[1],n[2]);


		}
		ang += angle;
	}
	
}



function calcNormal(x1, y1,  z1, x2,  y2,  z2, x3,  y3,  z3) {

	var ux = x2-x1, uy = y2-y1, uz = z2-z1;
	var vx = x3-x1, vy = y3-y1, vz = z3-z1;

	return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
}