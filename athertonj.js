function calcNormal(
  x1, y1, z1,
  x2, y2, z2,
  x3, y3, z3) {

  let ux = x2 - x1,
    uy = y2 - y1,
    uz = z2 - z1;
  let vx = x3 - x1,
    vy = y3 - y1,
    vz = z3 - z1;

  return [uy * vz - uz * vy,
    uz * vx - ux * vz,
    ux * vy - uy * vx
  ];
}

class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/*
  Looks best with teeth and spoke counts greater than 8.
*/
function joshAthertonGear(numTeeth = 40, numSpokes = 40) {
  const vertices = [];
  const colors = [];
  const normals = [];

  // Gear dimensions
  let n = numTeeth * 2;
  let t = numSpokes * 2;
  let rad = 1.0;
  let outRad = rad * 1.2;
  let angInc = 2 * 3.14159 / n;
  let angleIncSpokes = 2 * 3.14159 / t;
  let ang = 0;
  let z = 0.1;
  let gearSlantAngle = .065;

  //draw the outer circle face
  coinFaceJA(vertices, colors, normals, n, rad - .7, outRad, angInc, ang, z, false);
  //draw inner circle face
  coinFaceJA(vertices, colors, normals, n, rad - .7, outRad, angInc, ang, z, true);
  //draw inner circle outer edge
  coinEdgeJA(vertices, colors, normals, n, rad - .7, outRad, angInc, ang, z, false);
  //draw outer gear edge inbetween teeth
  coinEdgeJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, true);
  //draw larger ring inner edge
  coinEdgeJA(vertices, colors, normals, n, rad - .2, outRad, angInc, ang, z, false);
  //draw outer larger ring faces
  teethFaceJA(vertices, colors, normals, n, rad - .2, outRad - .2, angInc, ang, z, false);

  //draw teeth faces ––– These are angled
  teethFaceJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, true, gearSlantAngle);
  //draw roofs of the teeth
  coinEdgeJA(vertices, colors, normals, n, rad + .2, outRad, angInc, ang, gearSlantAngle - z, true, true);
  // coinEdge(vertices, colors, normals, n, rad + .2, outRad, angInc, ang, z - gearSlantAngle, true, true);
  //draw inner walls of teeth
  toothWallsJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, gearSlantAngle)

  /////// draw the spokes
  toothWallsJA(vertices, colors, normals, t, rad - .8, outRad - .4, angleIncSpokes, ang, z - .05)
  teethFaceJA(vertices, colors, normals, t, rad - .8, outRad - .3, angleIncSpokes, ang, z - .05, true);

  return [vertices, colors, normals];
}

let pushColors = (colors) => {
  //silver rgb(192,192,192)
  let c = { r: 192, g: 192, b: 192 };
  // //gold color
  // let c = { r: 207, g: 181, b: 59 };

  //normalize the rgb values to o to 1 range: (wanted - min) / (max - min)
  let color = [];
  color['r'] = (c.r - 0) / (255 - 0);
  color['g'] = (c.g - 0) / (255 - 0);
  color['b'] = (c.b - 0) / (255 - 0);

  colors.push(
    color.r, color.g, color.b,
    color.r, color.g, color.b,
    color.r, color.g, color.b);
  // colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5); //his
}

function coinFaceJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, frontFace) {
  let faceSide = -1;
  if (frontFace) {
    faceSide = 1;
  }

  for (let i = 0; i < n; i++) {
    vertices.push(
      0, 0, z * faceSide,
      rad * Math.cos(ang), rad * Math.sin(ang), z * faceSide,
      rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z * faceSide);

    pushColors(colors);
    //colors.push( 1,0,0,  0,1,0,  0,0,1);
    normals.push(
      0, 0, 1 * faceSide,
      0, 0, 1 * faceSide,
      0, 0, 1 * faceSide);
    ang += angInc;
  }
}

function coinEdgeJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, staggerDrawing, roofs = false) {
  drawTooth = true;
  var norm;
  if(roofs) {
    drawTooth = !drawTooth;
  }
  for (let i = 0; i < n; i++) {
    if (staggerDrawing)
      drawTooth = !drawTooth; // draw the plane for the teeth bottoms as well
    if (drawTooth) {

      if (roofs) {
        norm = calcNormal(
          -outRad * Math.cos(ang), -outRad * Math.sin(ang), -z,
          -outRad * Math.cos(ang + angInc), -outRad * Math.sin(ang + angInc), -z,
          -outRad * Math.cos(ang + angInc), -outRad * Math.sin(ang + angInc), z);
      } else {
        norm = calcNormal(
          rad * Math.cos(ang), rad * Math.sin(ang), -z,
          rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
          rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
      }

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

      pushColors(colors);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
        rad * Math.cos(ang), rad * Math.sin(ang), z)

      pushColors(colors);
      normals.push(norm[0], norm[1], norm[2],  norm[0], norm[1], norm[2],  norm[0], norm[1], norm[2])
    }

    ang += angInc;
  }
}

function teethFaceJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, staggerDrawing, slantAngle = 0) {

  let dir = slantAngle;
  for (let r = 0; r < 2; r++) {
    ang = 0;

    let drawTooth = false;
    if (!staggerDrawing) // if not drawing staggered style set to true to draw all faces
      drawTooth = true;

    dir *= -1;
    for (let i = 0; i < n; i++) { // face of the teeth
      if (staggerDrawing)
        drawTooth = !drawTooth; // draw the plane for the teeth bottoms as well
      if (drawTooth) {

        let vert1 = new Vector(rad * Math.cos(ang), rad * Math.sin(ang), z);
        let vert2 = new Vector(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
        let vert3 = new Vector(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + dir);

        vertices.push(
          vert1.x, vert1.y, vert1.z,
          vert2.x, vert2.y, vert2.z,
          vert3.x, vert3.y, vert3.z );

        pushColors(colors);

        let slantNormal = calcNormal(
          vert1.x, vert1.y, vert1.z,
          vert2.x, vert2.y, vert2.z,
          vert3.x, vert3.y, vert3.z
        );

        if (z > 0) {
          normals.push(
            -slantNormal[0], -slantNormal[1], -slantNormal[2],
            -slantNormal[0], -slantNormal[1], -slantNormal[2],
            -slantNormal[0], -slantNormal[1], -slantNormal[2]);
        } else {
          normals.push(
            slantNormal[0], slantNormal[1], slantNormal[2],
            slantNormal[0], slantNormal[1], slantNormal[2],
            slantNormal[0], slantNormal[1], slantNormal[2]);
        }

        vert1 = new Vector(rad * Math.cos(ang), rad * Math.sin(ang), z);
        vert2 = new Vector(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + dir);
        vert3 = new Vector(outRad * Math.cos(ang), outRad * Math.sin(ang), z + dir);

        vertices.push(
          vert1.x, vert1.y, vert1.z,
          vert2.x, vert2.y, vert2.z,
          vert3.x, vert3.y, vert3.z );

        pushColors(colors);

        slantNormal = calcNormal(
          vert1.x, vert1.y, vert1.z,
          vert2.x, vert2.y, vert2.z,
          vert3.x, vert3.y, vert3.z
        );

        if (z > 0) {
          normals.push(
            -slantNormal[0], -slantNormal[1], -slantNormal[2],
            -slantNormal[0], -slantNormal[1], -slantNormal[2],
            -slantNormal[0], -slantNormal[1], -slantNormal[2]);
        } else {
          normals.push(
            slantNormal[0], slantNormal[1], slantNormal[2],
            slantNormal[0], slantNormal[1], slantNormal[2],
            slantNormal[0], slantNormal[1], slantNormal[2]);
        }
      }
      ang += angInc;
    }
    z = -z;
  }

  z = -z;
}

function toothWallsJA(vertices, colors, normals, n, rad, outRad, angInc, ang, z, slantAngle=0) {
  drawTooth = false;
  let dir = slantAngle;
  for (let i = 0; i < n; i++) { // tooth walls
    drawTooth = !drawTooth;
    if (drawTooth) {

      //for drawing left wall when facing gear face on
      var norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z);

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), -z + dir,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z - dir)
      pushColors(colors);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      vertices.push(
        rad * Math.cos(ang), rad * Math.sin(ang), -z,
        outRad * Math.cos(ang), outRad * Math.sin(ang), z - dir,
        rad * Math.cos(ang), rad * Math.sin(ang), z)
      pushColors(colors);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

      //for drawing right wall when facing gear face on
      var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

      vertices.push(
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z + dir,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - dir)
      pushColors(colors);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


      vertices.push(
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - dir,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
      pushColors(colors);
      normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

    }
    ang += angInc;
  }
}
