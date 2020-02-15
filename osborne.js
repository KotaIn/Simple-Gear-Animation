//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function osbornemGear(numTeeth, numSpokes) {
  const vertices = [];
  const colors = [];
  const normals = [];


  ////////////////////////////
  // Making gear triangles

  var n = 200;
  numTeeth *= 2;
  numSpokes *= 2;
  var rad = 1.0;
  var outRad = rad * 1.2;
  var angInc = 2 * 3.14159 / numTeeth;
  let spokeInc = 2 * 3.14159 / numSpokes;
  let wallInc = 2 * 3.14159 / n;
  let wallAng = 0;
  var ang = 0;
  var spokeAng = 0;
  var z = 0.1;
  let faceWidthTrimAmt = 0.04;
  let innerCoinRad = rad * 0.3;
  let faceEdgeInnerRad = rad * 0.8;
  let adjustedSpokeLength = rad * 0.95;
  let gearWidth = 0.2;

  let centerColor = [0.8, 0.6, 0.3];
  let innerCoinOuterColor = [0.8, 0.6, 0.3];
  let outerCointInnerColor = [0.8, 0.6, 0.3];
  let outerCoinOuterColor = [0.9, 0.7, 0.4];
  let teethEdgeColor = [1.0, 0.8, 0.5];

  // coin face and spokes, front
  var i;
  z = gearWidth / 2;
  let drawSpoke = true;
  for (i = 0; i < n; i++) {
    drawSpoke = !drawSpoke;
    if (drawSpoke) {
      vertices.push(0, 0, z - 0.001,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), z- 0.001,
        adjustedSpokeLength * (Math.cos(spokeAng + spokeInc)), adjustedSpokeLength * (Math.sin(spokeAng + spokeInc)), z - 0.001)

      colors.push(centerColor[0], centerColor[1], centerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2]);
      // colors.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
      normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

      // vertices.push(0.1, 0.1, z,
      //   rad * Math.cos(spokeAng), rad * Math.sin(spokeAng), z,
      //   rad * Math.cos(spokeAng + angInc), rad * Math.sin(spokeAng + angInc), z)
      //
      // colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
      // // colors.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
      // normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
    }

    vertices.push(0, 0, z,
      innerCoinRad * Math.cos(wallAng), innerCoinRad * Math.sin(wallAng), z,
      innerCoinRad * Math.cos(wallAng + wallInc), innerCoinRad * Math.sin(wallAng + wallInc), z)

    colors.push(centerColor[0], centerColor[1], centerColor[2], innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2],innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2],);
    // colors.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

    spokeAng += spokeInc;
    wallAng += wallInc;
  }

  // coin face and spokes, back
  z = -gearWidth / 2;
  drawSpoke = true;
  for (i = 0; i < n; i++) {
    drawSpoke = !drawSpoke
    if (drawSpoke) {
      vertices.push(0, 0, z + 0.001,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), z + 0.001,
        adjustedSpokeLength * (Math.cos(spokeAng + spokeInc)), adjustedSpokeLength * (Math.sin(spokeAng + spokeInc)), z + 0.001)

      colors.push(centerColor[0], centerColor[1], centerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2]);
      // colors.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

      // vertices.push(0.1, 0.1, z,
      //   rad * Math.cos(spokeAng), rad * Math.sin(spokeAng), z,
      //   rad * Math.cos(spokeAng + angInc), rad * Math.sin(spokeAng + angInc), z)
      //
      // colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
      // // colors.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
      // normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
    }

    vertices.push(0, 0, z,
      innerCoinRad * Math.cos(wallAng), innerCoinRad * Math.sin(wallAng), z,
      innerCoinRad * Math.cos(wallAng + wallInc), innerCoinRad * Math.sin(wallAng + wallInc), z)

    colors.push(centerColor[0], centerColor[1], centerColor[2], innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2],innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2],);
    // colors.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

    spokeAng += spokeInc;
    wallAng += wallInc;
  }

  // gear spoke faces
  drawSpoke = true;
  for (i = 0; i < numSpokes; i++) {
    drawSpoke = !drawSpoke
    if (drawSpoke) {
      var norm = calcNormal(0, 0, z,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), z,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), -z);

      // Leading face (CW)
      vertices.push(
        0, 0, -z,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), -z,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), z)
      colors.push(centerColor[0], centerColor[1], centerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2]);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        0, 0, -z,
        adjustedSpokeLength * Math.cos(spokeAng), adjustedSpokeLength * Math.sin(spokeAng), z,
        0, 0, z)
      colors.push(centerColor[0], centerColor[1], centerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], centerColor[0], centerColor[1], centerColor[2],);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      var norm = calcNormal(
        0, 0, z,
        -adjustedSpokeLength * Math.cos(spokeAng + spokeInc), -adjustedSpokeLength * Math.sin(spokeAng + spokeInc), z,
        -adjustedSpokeLength * Math.cos(spokeAng + spokeInc), -adjustedSpokeLength * Math.sin(spokeAng + spokeInc), -z);

      // Trailing face (CW)
      vertices.push(
        0, 0, -z,
        adjustedSpokeLength * Math.cos(spokeAng + spokeInc), adjustedSpokeLength * Math.sin(spokeAng + spokeInc), -z,
        adjustedSpokeLength * Math.cos(spokeAng + spokeInc), adjustedSpokeLength * Math.sin(spokeAng + spokeInc), z)
      colors.push(centerColor[0], centerColor[1], centerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2]);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        0, 0, -z,
        adjustedSpokeLength * Math.cos(spokeAng + spokeInc), adjustedSpokeLength * Math.sin(spokeAng + spokeInc), z,
        0, 0, z)
      colors.push(centerColor[0], centerColor[1], centerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], centerColor[0], centerColor[1], centerColor[2],);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    }

    spokeAng += spokeInc;
  }

  // Make another coin face but rotate this one to the back
  // ang = 0;
  // for (i = 0; i < n; i++) {
  //   var mat = new Learn_webgl_matrix();
  //   var rotateMat = mat.create();
  //   mat.rotate(rotateMat, 180, 0, 1, 0);
  //
  //   var vec4 = new Learn_webgl_point4();
  //   var v1 = vec4.create(0, 0, z);
  //   var v2 = vec4.create(rad * Math.cos(ang), rad * Math.sin(ang), z);
  //   var v3 = vec4.create(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
  //
  //   var newV1 = vec4.create();
  //   mat.multiplyP4(newV1, rotateMat, v1);
  //
  //   var newV2 = vec4.create();
  //   mat.multiplyP4(newV2, rotateMat, v2);
  //
  //   var newV3 = vec4.create();
  //   mat.multiplyP4(newV3, rotateMat, v3);
  //
  //
  //   vertices.push(newV1[0], newV1[1], newV1[2],
  //     newV2[0], newV2[1], newV2[2],
  //     newV3[0], newV3[1], newV3[2]
  //   )
  //
  //   colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
  //   // colors.push( 1,0,0,  0,1,0,  0,0,1);
  //   /// AND WE COULD HAVE ROTATED THE NORMALS
  //   normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
  //   ang += angInc;
  // }

  // Front outer gear face
  z = gearWidth / 2
  for (i = 0; i < n; i++) {

    vertices.push(faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), z,
      faceEdgeInnerRad * Math.cos(wallAng + wallInc), faceEdgeInnerRad * Math.sin(wallAng + wallInc), z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), z)

    colors.push(outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

    vertices.push(faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), z,
      rad * Math.cos(wallAng), rad * Math.sin(wallAng), z);

    colors.push(outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

    wallAng += wallInc;
  }

  // back outer gear face
  z = -gearWidth / 2
  for (i = 0; i < n; i++) {

    vertices.push(faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), z,
      faceEdgeInnerRad * Math.cos(wallAng + wallInc), faceEdgeInnerRad * Math.sin(wallAng + wallInc), z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), z)

    colors.push(outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)

    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

    vertices.push(faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), z,
      rad * Math.cos(wallAng), rad * Math.sin(wallAng), z);

      colors.push(outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)

    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

    wallAng += wallInc;
  }

  // Edge of outer inner coin
  ang = 0;
  z = gearWidth / 2;
  for (i = 0; i < n; i++) {
    var norm = [-faceEdgeInnerRad * Math.cos(wallAng + wallInc / 2), -faceEdgeInnerRad * Math.sin(wallAng + wallInc / 2), 0];

    vertices.push(
      faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), -z,
      faceEdgeInnerRad * Math.cos(wallAng + wallInc), faceEdgeInnerRad * Math.sin(wallAng + wallInc), -z,
      faceEdgeInnerRad * Math.cos(wallAng + wallInc), faceEdgeInnerRad * Math.sin(wallAng + wallInc), z)

    colors.push(outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2],)
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    vertices.push(
      faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), -z,
      faceEdgeInnerRad * Math.cos(wallAng + wallInc), faceEdgeInnerRad * Math.sin(wallAng + wallInc), z,
      faceEdgeInnerRad * Math.cos(wallAng), faceEdgeInnerRad * Math.sin(wallAng), z)

    colors.push(outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2], outerCointInnerColor[0], outerCointInnerColor[1], outerCointInnerColor[2],)
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


    wallAng += wallInc;
  }

  // Edge of outer outer coin
  ang = 0;
  z = gearWidth / 2;
  for (i = 0; i < n; i++) {
    var norm = [rad * Math.cos(wallAng + wallInc / 2), rad * Math.sin(wallAng + wallInc / 2), 0];

    vertices.push(
      rad * Math.cos(wallAng), rad * Math.sin(wallAng), -z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), -z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), z)

    colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    vertices.push(
      rad * Math.cos(wallAng), rad * Math.sin(wallAng), -z,
      rad * Math.cos(wallAng + wallInc), rad * Math.sin(wallAng + wallInc), z,
      rad * Math.cos(wallAng), rad * Math.sin(wallAng), z)

    colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


    wallAng += wallInc;
  }

  // edge of inner coin
  ang = 0;
  z = gearWidth / 2;
  for (i = 0; i < n; i++) {
    var norm = [innerCoinRad * Math.cos(wallAng + wallInc / 2), innerCoinRad * Math.sin(wallAng + wallInc / 2), 0];

    vertices.push(
      innerCoinRad * Math.cos(wallAng), innerCoinRad * Math.sin(wallAng), -z,
      innerCoinRad * Math.cos(wallAng + wallInc), innerCoinRad * Math.sin(wallAng + wallInc), -z,
      innerCoinRad * Math.cos(wallAng + wallInc), innerCoinRad * Math.sin(wallAng + wallInc), z)

      colors.push(innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2], innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2], innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2],)
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    vertices.push(
      innerCoinRad * Math.cos(wallAng), innerCoinRad * Math.sin(wallAng), -z,
      innerCoinRad * Math.cos(wallAng + wallInc), innerCoinRad * Math.sin(wallAng + wallInc), z,
      innerCoinRad * Math.cos(wallAng), innerCoinRad * Math.sin(wallAng), z)

      colors.push(innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2], innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2], innerCoinOuterColor[0], innerCoinOuterColor[1], innerCoinOuterColor[2],)

    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


    wallAng += wallInc;
  }


  // old way of doing front coin face, better to rotate as above.
  // ang = 0;
  // for (i = 0; i < n; i++) {
  //
  //       vertices.push(0,0,-z,
  //                     rad*Math.cos(ang),rad*Math.sin(ang),-z,
  //                     rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)
  //
  //       colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
  //       normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
  //       ang += angInc;
  // }

  // Front tooth wall
  z = -gearWidth / 2
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {

      vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + faceWidthTrimAmt)

      colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

      vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + faceWidthTrimAmt,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z + faceWidthTrimAmt);


      colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)
      normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
    }
    ang += angInc;
  }

  // Back tooth wall
  z = gearWidth / 2
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {

      vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - faceWidthTrimAmt)

        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)

      normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

      vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - faceWidthTrimAmt,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z - faceWidthTrimAmt);

        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)

      normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
    }
    ang += angInc;
  }

  // Edge of the coin
  ang = 0;
  z = gearWidth / 2;
  var drawTooth = true;
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
    if (drawTooth) {

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
        rad * Math.cos(ang), rad * Math.sin(ang), z)

        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
    }

    ang += angInc;
  }


  // Edge of teeth
  ang = 0;
  drawTooth = false;
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {

      var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
      vertices.push(
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z + faceWidthTrimAmt,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z + faceWidthTrimAmt,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - faceWidthTrimAmt)

        colors.push(teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z + faceWidthTrimAmt,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - faceWidthTrimAmt,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z - faceWidthTrimAmt)

        colors.push(teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    }
    ang += angInc;
  }

  // Teeth faces
  ang = 0;
  drawTooth = false;
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {

      var norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z);

      // Leading face (CW)
      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z + faceWidthTrimAmt,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z - faceWidthTrimAmt)
        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z - faceWidthTrimAmt,
        rad * Math.cos(ang), rad * Math.sin(ang), z)
        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

      // Trailing face (CW)
      vertices.push(
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z + faceWidthTrimAmt,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - faceWidthTrimAmt)
        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - faceWidthTrimAmt,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
        colors.push(outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2], teethEdgeColor[0], teethEdgeColor[1], teethEdgeColor[2], outerCoinOuterColor[0], outerCoinOuterColor[1], outerCoinOuterColor[2],)

      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    }
    ang += angInc;
  }
  return [vertices, colors, normals]
}

function calcNormal(x1, y1, z1,
  x2, y2, z2,
  x3, y3, z3) {

  var ux = x2 - x1,
    uy = y2 - y1,
    uz = z2 - z1;
  var vx = x3 - x1,
    vy = y3 - y1,
    vz = z3 - z1;

  return [uy * vz - uz * vy,
    uz * vx - ux * vz,
    ux * vy - uy * vx
  ];
}
