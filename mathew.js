//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex

//	numTeeth - number of teeth for the gear, min value = 3
//	numSpoke - number of spokes for the gear, 0 or less produces no spokes
//	spokeWidth - width of the spoke, min value = 1, max value = 100
//	spokeThickness - thickness of the spoke, min value = 1, max value = 100
//	innerRadius - radius of the inner wheel, 0  or less will remove the inner wheel, max value = 100
//	ringRadius - radius of the outer ring, min value = 1, max value = 100
//	ringWidth - width of the outer ring, min value = 1, max value = 100
//	toothDepth - depth of the teeth, min value = 1, max value = 100
//	toothBevel - adjusts the angle of the face of the teeth, larger number creates a larger angle,
//				 min value = 0, max value = 9
//	r - red value, min value = 0, max value = 1
//	g - green value, min value = 0, max value = 1
//	b - blue value, min value = 0, max value = 1
function createBMathewGear(numTeeth, numSpoke, spokeWidth, spokeThickness, innerRadius,
						   ringRadius, ringWidth, toothDepth, toothBevel, r, g, b) {
	const vertices = [];
	const colors = [];
	const normals = [];

	if (numTeeth < 3) {
		numTeeth = 3;
	}

	if (spokeWidth < 1) {
		spokeWidth = 1;
	}
	else if (spokeWidth > 100) {
		spokeWidth = 100;
	}

	if (spokeThickness < 1) {
		spokeThickness = 1;
	}
	else if (spokeThickness > 100) {
		spokeThickness = 100;
	}

	if (innerRadius <= 0) {
		innerRadius = 0;
	}
	else {
		if (innerRadius > 100) {
			innerRadius = 100;
		}

		innerRadius = innerRadius / 100;
	}

	if (ringRadius < 1) {
		ringRadius = 1;
	}
	else if (ringRadius > 100) {
		ringRadius = 100;
	}

	if (ringWidth < 1) {
		ringWidth = 1;
	}
	else if (ringWidth > 100) {
		ringWidth = 100;
	}

	if (toothDepth < 1) {
		toothDepth = 1;
	}
	else if (toothDepth > 100) {
		toothDepth = 100;
	}

	if (toothBevel < 0) {
		toothBevel = 0;
	}
	else {
		if (toothBevel > 9) {
			toothBevel = 9;
		}
		toothBevel = 1 - toothBevel / 10;
	}

	var n = numTeeth * 2;
	var innerRad = innerRadius;
	var ringInnerRad = ringRadius / 100;
	var ringOuterRad = ringInnerRad + ringWidth / 100;
	var outerRad = ringOuterRad + toothDepth / 100;
	var angle = 0;
	var angleInc = 2 * Math.PI / n;
	var z = 0.1;
	var drawTooth = true;
	var numSpoke = numSpoke;
	var spokeWidth = spokeWidth / 1000;
	var spokeThickness = spokeThickness / 1000;
	var spokeInc = 2 * Math.PI / numSpoke;
	var r = r;
	var g = g;
	var b = b;

	// inner circle
	if (innerRad > 0) {
		angle = 0;
		for (var i = 0; i < n; i++) {
			// front
			vertices.push(0, 0, -z,
						  innerRad * Math.cos(angle), innerRad * Math.sin(angle), -z,
						  innerRad * Math.cos(angle + angleInc), innerRad * Math.sin(angle + angleInc), -z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(0, 0, -1,
						 0, 0, -1,
						 0, 0, -1);

			// back
			vertices.push(0, 0, z,
						  innerRad * Math.cos(angle), innerRad * Math.sin(angle), z,
						  innerRad * Math.cos(angle + angleInc), innerRad * Math.sin(angle + angleInc), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(0, 0, 1,
						 0, 0, 1,
						 0, 0, 1);

			// edge
			var norm = [innerRad * Math.cos(angle + angleInc / 2), innerRad * Math.sin(angle + angleInc / 2), 0];

			vertices.push(innerRad * Math.cos(angle), innerRad * Math.sin(angle), -z,
						  innerRad * Math.cos(angle + angleInc), innerRad * Math.sin(angle + angleInc), -z,
						  innerRad * Math.cos(angle + angleInc), innerRad * Math.sin(angle + angleInc), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(norm[0], norm[1], norm[2],
						 norm[0], norm[1], norm[2],
						 norm[0], norm[1], norm[2]);

			vertices.push(innerRad * Math.cos(angle), innerRad * Math.sin(angle), -z,
						  innerRad * Math.cos(angle + angleInc), innerRad * Math.sin(angle + angleInc), z,
						  innerRad * Math.cos(angle), innerRad * Math.sin(angle), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(norm[0], norm[1], norm[2],
						 norm[0], norm[1], norm[2],
						 norm[0], norm[1], norm[2]);

			angle += angleInc;
		}
	}

	// outer ring
	angle = 0 - angleInc / 2;
	for (var i = 0; i < n; i++) {
		// front
		vertices.push(ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), -z,
					  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), -z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), -z);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, -1,
					 0, 0, -1,
					 0, 0, -1);

		vertices.push(ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), -z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), -z,
					  ringInnerRad * Math.cos(angle), ringInnerRad * Math.sin(angle), -z);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, -1,
					 0, 0, -1,
					 0, 0, -1);

		// back
		vertices.push(ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z,
					  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), z);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, 1,
					 0, 0, 1,
					 0, 0, 1);

		vertices.push(ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), z,
					  ringInnerRad * Math.cos(angle), ringInnerRad * Math.sin(angle), z);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, 1,
					 0, 0, 1,
					 0, 0, 1);

		// inside
		var innerNorm = [-ringInnerRad * Math.cos(angle + angleInc / 2), -ringInnerRad * Math.sin(angle + angleInc / 2), 0];

		vertices.push(ringInnerRad * Math.cos(angle), ringInnerRad * Math.sin(angle), -z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), -z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), z);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(innerNorm[0], innerNorm[1], innerNorm[2],
					 innerNorm[0], innerNorm[1], innerNorm[2],
					 innerNorm[0], innerNorm[1], innerNorm[2]);

		vertices.push(ringInnerRad * Math.cos(angle), ringInnerRad * Math.sin(angle), -z,
					  ringInnerRad * Math.cos(angle + angleInc), ringInnerRad * Math.sin(angle + angleInc), z,
					  ringInnerRad * Math.cos(angle), ringInnerRad * Math.sin(angle), z);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(innerNorm[0], innerNorm[1], innerNorm[2],
					 innerNorm[0], innerNorm[1], innerNorm[2],
					 innerNorm[0], innerNorm[1], innerNorm[2]);

		// outside
		drawTooth = !drawTooth;
		if (drawTooth) {
			// tooth front
			var frontNorm = calcNormal(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
									   ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), -z,
									   outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), -z * toothBevel);
			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
						  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), -z * toothBevel,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), -z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(frontNorm[0], frontNorm[1], frontNorm[2],
						 frontNorm[0], frontNorm[1], frontNorm[2],
						 frontNorm[0], frontNorm[1], frontNorm[2]);

			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), -z,
						  ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), -z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(frontNorm[0], frontNorm[1], frontNorm[2],
						 frontNorm[0], frontNorm[1], frontNorm[2],
						 frontNorm[0], frontNorm[1], frontNorm[2]);

			// tooth back
			var backNorm = calcNormal(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), z * toothBevel,
									  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), z * toothBevel,
									  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z);
			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), z * toothBevel,
						  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), z * toothBevel,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(backNorm[0], backNorm[1], backNorm[2],
						 backNorm[0], backNorm[1], backNorm[2],
						 backNorm[0], backNorm[1], backNorm[2]);

			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), z * toothBevel,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z,
						  ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(backNorm[0], backNorm[1], backNorm[2],
						 backNorm[0], backNorm[1], backNorm[2],
						 backNorm[0], backNorm[1], backNorm[2]);

			// tooth top wall
			var topWallNorm = calcNormal(outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), -z * toothBevel,
										 ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z,
						  				 outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), z * toothBevel);
			vertices.push(outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), -z * toothBevel,
						  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), z * toothBevel,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(topWallNorm[0], topWallNorm[1], topWallNorm[2],
						 topWallNorm[0], topWallNorm[1], topWallNorm[2],
						 topWallNorm[0], topWallNorm[1], topWallNorm[2]);

			vertices.push(outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), -z * toothBevel,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), -z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(topWallNorm[0], topWallNorm[1], topWallNorm[2],
						 topWallNorm[0], topWallNorm[1], topWallNorm[2],
						 topWallNorm[0], topWallNorm[1], topWallNorm[2]);

			// tooth bottom wall
			var botWallNorm = calcNormal(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
										 outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), z * toothBevel,
										 ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z);
			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
						  outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), z * toothBevel,
						  ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(botWallNorm[0], botWallNorm[1], botWallNorm[2],
						 botWallNorm[0], botWallNorm[1], botWallNorm[2],
						 botWallNorm[0], botWallNorm[1], botWallNorm[2]);

			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
						  ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z,
						  ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), -z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(botWallNorm[0], botWallNorm[1], botWallNorm[2],
						 botWallNorm[0], botWallNorm[1], botWallNorm[2],
						 botWallNorm[0], botWallNorm[1], botWallNorm[2]);

			// tooth roof
			var roofNorm = [outerRad * Math.cos(angle + angleInc / 2), outerRad * Math.sin(angle + angleInc / 2), 0];
			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
						  outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), z * toothBevel,
						  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), z * toothBevel);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(roofNorm[0], roofNorm[1], roofNorm[2],
						 roofNorm[0], roofNorm[1], roofNorm[2],
						 roofNorm[0], roofNorm[1], roofNorm[2]);

			vertices.push(outerRad * Math.cos(angle + 2 * angleInc / n), outerRad * Math.sin(angle + 2 * angleInc / n), -z * toothBevel,
						  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), z * toothBevel,
						  outerRad * Math.cos(angle + angleInc - 2 * angleInc / n), outerRad * Math.sin(angle + angleInc - 2 * angleInc / n), -z * toothBevel);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(roofNorm[0], roofNorm[1], roofNorm[2],
						 roofNorm[0], roofNorm[1], roofNorm[2],
						 roofNorm[0], roofNorm[1], roofNorm[2]);
		}
		else {
			// edge
			var outerNorm = [ringOuterRad * Math.cos(angle + angleInc / 2), ringOuterRad * Math.sin(angle + angleInc / 2), 0];

			vertices.push(ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), -z,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), -z,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(outerNorm[0], outerNorm[1], outerNorm[2],
						 outerNorm[0], outerNorm[1], outerNorm[2],
						 outerNorm[0], outerNorm[1], outerNorm[2]);

			vertices.push(ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), -z,
						  ringOuterRad * Math.cos(angle + angleInc), ringOuterRad * Math.sin(angle + angleInc), z,
						  ringOuterRad * Math.cos(angle), ringOuterRad * Math.sin(angle), z);
			colors.push(r, g, b,
						r, g, b,
						r, g, b);
			normals.push(outerNorm[0], outerNorm[1], outerNorm[2],
						 outerNorm[0], outerNorm[1], outerNorm[2],
						 outerNorm[0], outerNorm[1], outerNorm[2]);
		}

		angle += angleInc;
	}

	// spokes
	angle = 0 + spokeInc / 2;
	for (var i = 0; i < numSpoke; i++) {
		// front
		vertices.push(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), -spokeThickness,
					  ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), -spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), -spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, -1,
					 0, 0, -1,
					 0, 0, -1);

		vertices.push(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), -spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), -spokeThickness,
					  spokeWidth * Math.sin(angle), -spokeWidth * Math.cos(angle), -spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, -1,
					 0, 0, -1,
					 0, 0, -1);

		// back
		vertices.push(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), spokeThickness,
					  ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, 1,
					 0, 0, 1,
					 0, 0, 1);

		vertices.push(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), spokeThickness,
					  spokeWidth * Math.sin(angle), -spokeWidth * Math.cos(angle), spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(0, 0, 1,
					 0, 0, 1,
					 0, 0, 1);

		// top
		var topNorm = calcNormal(ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), -spokeThickness,
							  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), spokeThickness,
							  ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), spokeThickness);

		vertices.push(ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), -spokeThickness,
					  ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(topNorm[0], topNorm[1], topNorm[2],
					 topNorm[0], topNorm[1], topNorm[2],
					 topNorm[0], topNorm[1], topNorm[2]);

		vertices.push(ringInnerRad * Math.cos(angle) - spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) + spokeWidth * Math.cos(angle), -spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), spokeThickness,
					  -spokeWidth * Math.sin(angle), spokeWidth * Math.cos(angle), -spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(topNorm[0], topNorm[1], topNorm[2],
					 topNorm[0], topNorm[1], topNorm[2],
					 topNorm[0], topNorm[1], topNorm[2]);

		// bottom
		var botNorm = calcNormal(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), -spokeThickness,
								 ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), spokeThickness,
								 spokeWidth * Math.sin(angle), -spokeWidth * Math.cos(angle), spokeThickness);

		vertices.push(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), -spokeThickness,
					  ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), spokeThickness,
					  spokeWidth * Math.sin(angle), -spokeWidth * Math.cos(angle), spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(botNorm[0], botNorm[1], botNorm[2],
					 botNorm[0], botNorm[1], botNorm[2],
					 botNorm[0], botNorm[1], botNorm[2]);

		vertices.push(ringInnerRad * Math.cos(angle) + spokeWidth * Math.sin(angle), ringInnerRad * Math.sin(angle) - spokeWidth * Math.cos(angle), -spokeThickness,
					  spokeWidth * Math.sin(angle), -spokeWidth * Math.cos(angle), spokeThickness,
					  spokeWidth * Math.sin(angle), -spokeWidth * Math.cos(angle), -spokeThickness);
		colors.push(r, g, b,
					r, g, b,
					r, g, b);
		normals.push(botNorm[0], botNorm[1], botNorm[2],
					 botNorm[0], botNorm[1], botNorm[2],
					 botNorm[0], botNorm[1], botNorm[2]);

		angle += spokeInc;
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