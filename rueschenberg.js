//NATHAN RUESCHENBERG
//TCSS 458 - WINTER 2019
//HOMEWORK 4

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function nathanRuesGear(numTeeth, numSpokes, teethSlant, middleWidth, outerWidth) {
  const vertices = [];
  const colors = [];
  const normals = [];

  ////////////////////////////
  // Making gear triangles

  var n = numTeeth * 2;
  var rad = 1.0;
  var outRad = rad * 1.2;
  var angInc = 2 * 3.14159 / n;
  var ang = 0;
  var z = 0.1;

  var i; //  coin face, front
  for (i = 0; i < n; i++) {

    vertices.push((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), z,
      rad * Math.cos(ang), rad * Math.sin(ang), z,
      rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);

    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

    vertices.push((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), z,
      rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
      (rad - outerWidth) * Math.cos(ang + angInc), (rad - outerWidth) * Math.sin(ang + angInc), z);

    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

    //connecting the two sides:
    let vec4 = new Learn_webgl_point4();
    let top1 = vec4.create((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), z);
    let top2 = vec4.create((rad - outerWidth) * Math.cos(ang + angInc), (rad - outerWidth) * Math.sin(ang + angInc), z);
    let top3 = vec4.create((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), -z);

    let nor1 = calcNormal(top1[0], top1[1], top1[2], top2[0], top2[1], top2[2], top3[0], top3[1], top3[2]);

    vertices.push(top1[0], top1[1], top1[2], top2[0], top2[1], top2[2], top3[0], top3[1], top3[2]);
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(nor1[0], nor1[1], nor1[2], nor1[0], nor1[1], nor1[2], nor1[0], nor1[1], nor1[2]);

    top1 = vec4.create((rad - outerWidth) * Math.cos(ang + angInc), (rad - outerWidth) * Math.sin(ang + angInc), -z);
    top2 = vec4.create((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), -z);
    top3 = vec4.create((rad - outerWidth) * Math.cos(ang + angInc), (rad - outerWidth) * Math.sin(ang + angInc), z);

    let nor2 = calcNormal(top1[0], top1[1], top1[2], top2[0], top2[1], top2[2], top3[0], top3[1], top3[2]);

    vertices.push(top1[0], top1[1], top1[2], top2[0], top2[1], top2[2], top3[0], top3[1], top3[2]);
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(nor2[0], nor2[1], nor2[2], nor2[0], nor2[1], nor2[2], nor2[0], nor2[1], nor2[2]);

    //center circle:
    vertices.push(0, 0, z,
      middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), z);

    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

    //connecting center circles:
    vertices.push(middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), z,
      middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), -z);

    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);

    let circleNorms1 = calcNormal(middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), z,
      middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), -z);

    normals.push(circleNorms1[0], circleNorms1[1], circleNorms1[2],
      circleNorms1[0], circleNorms1[1], circleNorms1[2],
      circleNorms1[0], circleNorms1[1], circleNorms1[2]);

    vertices.push(middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), -z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), -z);

    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);

    let circleNorms2 = calcNormal(middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), -z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), z,
      middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), -z);

    normals.push(circleNorms2[0], circleNorms2[1], circleNorms2[2],
      circleNorms2[0], circleNorms2[1], circleNorms2[2],
      circleNorms2[0], circleNorms2[1], circleNorms2[2]);

    ang += angInc;
  }

  ang = 0;
  for (i = 0; i < n; i++) {
    var mat = new Learn_webgl_matrix();
    var rotateMat = mat.create();
    mat.rotate(rotateMat, 180, 0, 1, 0);

    var vec4 = new Learn_webgl_point4();
    var v1 = vec4.create((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), z);
    var v2 = vec4.create(rad * Math.cos(ang), rad * Math.sin(ang), z);
    var v3 = vec4.create(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);

    var newV1 = vec4.create();
    mat.multiplyP4(newV1, rotateMat, v1);

    var newV2 = vec4.create();
    mat.multiplyP4(newV2, rotateMat, v2);

    var newV3 = vec4.create();
    mat.multiplyP4(newV3, rotateMat, v3);

    vertices.push(newV1[0], newV1[1], newV1[2],
      newV2[0], newV2[1], newV2[2],
      newV3[0], newV3[1], newV3[2]
    )

    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

    var v11 = vec4.create((rad - outerWidth) * Math.cos(ang), (rad - outerWidth) * Math.sin(ang), z);
    var v22 = vec4.create(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
    var v33 = vec4.create((rad - outerWidth) * Math.cos(ang + angInc), (rad - outerWidth) * Math.sin(ang + angInc), z);

    let newV11 = vec4.create();
    mat.multiplyP4(newV11, rotateMat, v11);

    let newV22 = vec4.create();
    mat.multiplyP4(newV22, rotateMat, v22);

    let newV33 = vec4.create();
    mat.multiplyP4(newV33, rotateMat, v33);

    vertices.push(newV11[0], newV11[1], newV11[2],
      newV22[0], newV22[1], newV22[2],
      newV33[0], newV33[1], newV33[2]
    );
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

    let innerV1 = vec4.create(0, 0, z);

    let innerV2 = vec4.create(middleWidth * Math.cos(ang), middleWidth * Math.sin(ang), z);

    let innerV3 = vec4.create(middleWidth * Math.cos(ang + angInc), middleWidth * Math.sin(ang + angInc), z);

    let newInner1 = vec4.create();
    mat.multiplyP4(newInner1, rotateMat, innerV1);

    let newInner2 = vec4.create();
    mat.multiplyP4(newInner2, rotateMat, innerV2);

    let newInner3 = vec4.create();
    mat.multiplyP4(newInner3, rotateMat, innerV3);

    vertices.push(newInner1[0], newInner1[1], newInner1[2],
      newInner2[0], newInner2[1], newInner2[2],
      newInner3[0], newInner3[1], newInner3[2]
    );
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

    ang += angInc;
  }

  var r;
  for (r = 0; r < 2; r++) {
    ang = 0;
    var drawTooth = false;

    for (i = 0; i < n; i++) { // face of the teeth
      drawTooth = !drawTooth;
      if (drawTooth) {

        vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
          rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
          outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant)

        colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);

        if (z > 0)
          normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        else
          normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
          outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant,
          outRad * Math.cos(ang), outRad * Math.sin(ang), z / teethSlant);

        colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);

        if (z > 0)
          normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        else
          normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
      }
      ang += angInc;
    }
    z = -z;
  }
  z = -z;

  ang = 0; // coin edge
  var drawTooth = true;
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
    if (drawTooth) {
      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
        rad * Math.cos(ang), rad * Math.sin(ang), z)

      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
    }
    ang += angInc;
  }

  ang = 0;
  drawTooth = false; // tooth roof
  for (i = 0; i < n; i++) {
    drawTooth = !drawTooth;
    if (drawTooth) {

      var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];

      //top right triangle
      vertices.push(
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z / teethSlant,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / teethSlant,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant)

      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      //bottom left triangle
      vertices.push(
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z / teethSlant,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z / teethSlant)

      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
    }
    ang += angInc;
  }

  ang = 0;

  drawTooth = false;
  for (i = 0; i < n; i++) { // tooth  INSIDE walls
    drawTooth = !drawTooth;
    if (drawTooth) {
      var norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z / teethSlant,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z);

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z / teethSlant,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z / teethSlant)
      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z / teethSlant,
        rad * Math.cos(ang), rad * Math.sin(ang), z)
      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / teethSlant,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant);

      vertices.push(
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / teethSlant,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant)
      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / teethSlant,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
      colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
    }
    ang += angInc;
  }

  //Create spokes
  let startingAngle = -3;
  let inc = 360.0 / numSpokes;
  for (let i = 0; i < numSpokes; i++) {
    addSpoke(false, outerWidth, middleWidth, startingAngle, z, rad, vertices, normals, colors);
    addSpoke(true, outerWidth, middleWidth, startingAngle, -z, rad, vertices, normals, colors);
    startingAngle += inc;
  }

  return [vertices, colors, normals]
}

function addSpoke(front, innerWidth, innerSpace, start, z, rad, vertices, normals, colors) {
  let vec4 = new Learn_webgl_point4();
  let mat = new Learn_webgl_matrix();
  let rotateMat = mat.create();
  mat.rotate(rotateMat, 180, 0, 1, 0);

  let v1 = vec4.create(innerSpace * Math.cos(toRadians(start)),
    innerSpace * Math.sin(toRadians(start)), z);
  let v2 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start)),
    (rad - innerWidth + 0.05) * Math.sin(toRadians(start)), z);
  let v3 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start + 10)),
    (rad - innerWidth + 0.05) * Math.sin(toRadians(start + 10)), z);

  let newV1 = vec4.create();
  mat.multiplyP4(newV1, rotateMat, v1);
  let newV2 = vec4.create();
  mat.multiplyP4(newV2, rotateMat, v2);
  let newV3 = vec4.create();
  mat.multiplyP4(newV3, rotateMat, v3);

  vertices.push(newV1[0], newV1[1], newV1[2],
    newV2[0], newV2[1], newV2[2],
    newV3[0], newV3[1], newV3[2]);

  if (front) {
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
  } else {
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
  }

  let v12 = vec4.create(innerSpace * Math.cos(toRadians(start + 10)),
    innerSpace * Math.sin(toRadians(start + 10)), z);
  let v22 = vec4.create(innerSpace * Math.cos(toRadians(start)),
    innerSpace * Math.sin(toRadians(start)), z);
  let v32 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start + 10)),
    (rad - innerWidth + 0.05) * Math.sin(toRadians(start + 10)), z);

  let newV12 = vec4.create();
  mat.multiplyP4(newV12, rotateMat, v12);
  let newV22 = vec4.create();
  mat.multiplyP4(newV22, rotateMat, v22);
  let newV32 = vec4.create();
  mat.multiplyP4(newV32, rotateMat, v32);

  vertices.push(newV12[0], newV12[1], newV12[2],
    newV22[0], newV22[1], newV22[2],
    newV32[0], newV32[1], newV32[2]
  );

  if (front) {
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
  } else {
    colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
  }

  //Wall between spokes
  let sideV2 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start + 10)),
    (rad - innerWidth + 0.05) * Math.sin(toRadians(start + 10)), z);
  let sideV22 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start)),
    (rad - innerWidth + 0.05) * Math.sin(toRadians(start)), z)
  let newSide2 = vec4.create();
  let newSide22 = vec4.create();
  mat.multiplyP4(newSide2, rotateMat, sideV2);
  mat.multiplyP4(newSide22, rotateMat, sideV22);
  let sideV1, newSide1, sideV3, newSide3;
  let sideV12, newSide12, sideV32, newSide32;
  if (front) { //frontside
    sideV1 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start + 10)),
      (rad - innerWidth + 0.05) * Math.sin(toRadians(start + 10)), -z);
    sideV12 = vec4.create((rad - innerWidth + 0.05) * Math.cos(toRadians(start)),
      (rad - innerWidth + 0.05) * Math.sin(toRadians(start)), -z);

    newSide1 = vec4.create();
    newSide12 = vec4.create();
    mat.multiplyP4(newSide1, rotateMat, sideV1);
    mat.multiplyP4(newSide12, rotateMat, sideV12);

    sideV3 = vec4.create(innerSpace * Math.cos(toRadians(start + 10)),
      innerSpace * Math.sin(toRadians(start + 10)), z);
    sideV32 = vec4.create(innerSpace * Math.cos(toRadians(start)),
      innerSpace * Math.sin(toRadians(start)), z);

    newSide3 = vec4.create();
    newSide32 = vec4.create();
    mat.multiplyP4(newSide3, rotateMat, sideV3);
    mat.multiplyP4(newSide32, rotateMat, sideV32);
  } else { //backside
    sideV1 = vec4.create(innerSpace * Math.cos(toRadians(start + 10)),
      innerSpace * Math.sin(toRadians(start + 10)), z);
    sideV12 = vec4.create(innerSpace * Math.cos(toRadians(start)),
      innerSpace * Math.sin(toRadians(start)), z);

    newSide1 = vec4.create();
    newSide12 = vec4.create();
    mat.multiplyP4(newSide1, rotateMat, sideV1);
    mat.multiplyP4(newSide12, rotateMat, sideV12);

    sideV3 = vec4.create(innerSpace * Math.cos(toRadians(start + 10)),
      innerSpace * Math.sin(toRadians(start + 10)), -z);
    sideV32 = vec4.create(innerSpace * Math.cos(toRadians(start)),
      innerSpace * Math.sin(toRadians(start)), -z);

    newSide3 = vec4.create();
    newSide32 = vec4.create();

    mat.multiplyP4(newSide3, rotateMat, sideV3);
    mat.multiplyP4(newSide32, rotateMat, sideV32);
  }
  vertices.push(newSide1[0], newSide1[1], newSide1[2],
    newSide2[0], newSide2[1], newSide2[2],
    newSide3[0], newSide3[1], newSide3[2]
  );

  vertices.push(newSide12[0], newSide12[1], newSide12[2],
    newSide22[0], newSide22[1], newSide22[2],
    newSide32[0], newSide32[1], newSide32[2]
  );

  let norms1 = calcNormal(newSide1[0], newSide1[1], newSide1[2],
    newSide2[0], newSide2[1], newSide2[2],
    newSide3[0], newSide3[1], newSide3[2]);

  let norms2 = calcNormal(newSide12[0], newSide12[1], newSide12[2],
    newSide22[0], newSide22[1], newSide22[2],
    newSide32[0], newSide32[1], newSide32[2]);

  colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
  // normals.push(0, 0, 0, 0, 0, 0, 0, 0, 0);
  normals.push(norms1[0], norms1[1], norms1[2], norms1[0], norms1[1], norms1[2],
    norms1[0], norms1[1], norms1[2]);

  colors.push(0.525, 0.326, 0.146, 0.525, 0.326, 0.146, 0.525, 0.326, 0.146);
  // normals.push(0, 0, 0, 0, 0, 0, 0, 0, 0);
  normals.push(norms2[0], norms2[1], norms2[2], norms2[0], norms2[1], norms2[2],
    norms2[0], norms2[1], norms2[2]);
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
