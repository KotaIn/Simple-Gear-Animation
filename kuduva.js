/**Hari Kuduva's Gear, TCSS 458 Graphics, Winter 2019 */

var rad = 1.0;
var outRad = rad * 1.2;
var ang = 0;
var z = .1;
var zFactor = 0.066;
var outerRim = rad * .85;
var innerCircle = rad / 5;
var spokes, spokeAngleInc, n, angInc;

function kuduvaGear(numTeeth, numSpokes) {
    self.n = numTeeth * 2;
    self.spokes = 2*numSpokes;
    self.spokeAngleInc = 2 * 3.14159 / self.spokes;
    self.angInc =  2 * 3.14159 / self.n;

    let vertices = [], colors = [], normals = [];
    drawCoinFace(vertices, colors, normals, true);
    drawCoinFace(vertices, colors, normals, false);
    drawSpokes(vertices, colors, normals);
    createCoinEdge(innerCircle, vertices, colors, normals, false);
    createCoinEdge(outerRim, vertices, colors, normals, true);
    createCoinEdge(rad, vertices, colors, normals, false);

    ang = 0;
    for (i = 0; i < n; i++) {
        var mat = new Learn_webgl_matrix();
        var rotateMat = mat.create();
        mat.rotate(rotateMat, 180, 0, 1, 0);

        var vec4 = new Learn_webgl_point4();
        var v1 = vec4.create(0, 0, z);
        var v2 = vec4.create(innerCircle * Math.cos(ang), innerCircle * Math.sin(ang), z);
        var v3 = vec4.create(innerCircle * Math.cos(ang + angInc), innerCircle * Math.sin(ang + angInc), z);

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

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angInc;
    }

    for (var r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
        for (i = 0; i < n; i++) { // face of the teeth
            drawTooth = !drawTooth;
            drawRim(outerRim, rad, ang, angInc, z, vertices, zFactor, colors, normals);
            if (drawTooth) {
                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - zFactor)
                colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - zFactor,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z - zFactor);

                colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            }
            ang += angInc;
        }
        z = -z;
        zFactor = -1 * zFactor;
    }

    z = -z;

    ang = 0;
    drawTooth = false; // tooth roof
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z - zFactor,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z - zFactor,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zFactor)

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z - zFactor,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zFactor,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z + zFactor)

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }
        ang += angInc;
    }

    ang = 0;
    drawTooth = false;
    for (i = 0; i < n; i++) { // tooth walls
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z);
            // ok 
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z - zFactor,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z + zFactor)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5) //original
            //colors.push(1,0.5,0.5,  1,0.5,0.5,  1,0.5,0.5) // added
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            //ok 
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z + zFactor,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            //colors.push(1,0.5,0.5,  1,0.5,0.5,  1,0.5,0.5) // added
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z - zFactor,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zFactor)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            //colors.push(1,0.5,0.5,  1,0.5,0.5,  1,0.5,0.5) // added

            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zFactor,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }
    return [vertices, colors, normals]
}

function drawRim(outerRim, rad, ang, angInc, z, vertices, zFactor, colors, normals) {
    vertices.push(outerRim * Math.cos(ang), outerRim * Math.sin(ang), z,
    outerRim * Math.cos(ang + angInc), outerRim * Math.sin(ang + angInc), z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
    colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)

    if (z > 0)
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
    else
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
    vertices.push(outerRim * Math.cos(ang), outerRim * Math.sin(ang), z,
        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
        rad * Math.cos(ang), rad * Math.sin(ang), z);

    colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
    if (z > 0)
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
    else
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
}

function calcNormal(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    var ux = x2 - x1,
        uy = y2 - y1,
        uz = z2 - z1;
    var vx = x3 - x1,
        vy = y3 - y1,
        vz = z3 - z1;
    return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
}

function createCoinEdge(factor, vertices, colors, normals, isOutterRim) {
    ang = 0; // coin edge inner
    var drawTooth = true;
    for (i = 0; i < n * 2; i++) {
        drawTooth = !drawTooth;
        var norm = [factor * Math.cos(ang + angInc / 2), factor * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {
            vertices.push(
                factor * Math.cos(ang), factor * Math.sin(ang), -z,
                factor * Math.cos(ang + angInc), factor * Math.sin(ang + angInc), -z,
                factor * Math.cos(ang + angInc), factor * Math.sin(ang + angInc), z);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            if (isOutterRim) {
                normals.push(-norm[0], -norm[1], -norm[2], -norm[0],
                     -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            } else {
                normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
            }

            vertices.push(
                factor * Math.cos(ang), factor * Math.sin(ang), -z,
                factor * Math.cos(ang + angInc), factor * Math.sin(ang + angInc), z,
                factor * Math.cos(ang), factor * Math.sin(ang), z)

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            if (isOutterRim) {
                normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            } else {
                normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
            }
        }
        ang += angInc / 2;
    }    
}

function drawCoinFace(vertices, colors, normals, isFront) {
    ang = 0;
    for (i = 0; i < n; i++) {
        vertices.push(0, 0, (isFront) ? z : -z,
            innerCircle * Math.cos(ang), innerCircle * Math.sin(ang), (isFront) ? z : -z,
            innerCircle * Math.cos(ang + angInc), innerCircle * Math.sin(ang + angInc), (isFront) ? z : -z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, (isFront) ? 1 : -1, 0, 0, (isFront) ? 1 : -1, 0, 0, (isFront) ? 1 : -1);
        ang += angInc;
    }
}

function drawSpokes(vertices, colors, normals) {
    drawSpokesFrontBack(vertices, colors, normals, true);
    drawSpokesFrontBack(vertices, colors, normals, false);
    drawSidesOfSpoke(vertices, colors, normals);
}

function drawSpokesFrontBack(vertices, colors, normals, isFront) {
    ang = 0, drawTooth = false;
    for (var i = 0; i < spokes; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            vertices.push(0, 0, (isFront) ? z : -z,
                rad * Math.cos(ang), rad * Math.sin(ang), (isFront) ? z : -z,
                rad * Math.cos(ang + spokeAngleInc), rad * Math.sin(ang + spokeAngleInc), (isFront) ? z : -z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(0, 0, (isFront) ? 1 : -1, 0, 0, (isFront) ? 1 : -1, 0, 0, (isFront) ? 1 : -1);
        }
        ang += spokeAngleInc; 
    }
}

function drawSidesOfSpoke(vertices, colors, normals) {
    ang = 0;
    drawTooth = false;
    for (i = 0; i < spokes; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            var norm = [innerCircle * Math.cos(ang + angInc / 2), innerCircle * Math.sin(ang + spokeAngleInc / 2), 0];
            vertices.push(
                outerRim * Math.cos(ang), outerRim * Math.sin(ang), -z,
                innerCircle * Math.cos(ang), innerCircle * Math.sin(ang), -z,
                innerCircle * Math.cos(ang), innerCircle * Math.sin(ang), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0],-norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            vertices.push(
                outerRim * Math.cos(ang), outerRim * Math.sin(ang), -z,
                innerCircle * Math.cos(ang), innerCircle * Math.sin(ang), z,
                outerRim * Math.cos(ang), outerRim * Math.sin(ang), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            vertices.push(
                outerRim * Math.cos(ang + spokeAngleInc), outerRim * Math.sin(ang + spokeAngleInc), -z,
                innerCircle * Math.cos(ang + spokeAngleInc), innerCircle * Math.sin(ang + spokeAngleInc), -z,
                innerCircle * Math.cos(ang + spokeAngleInc), innerCircle * Math.sin(ang + spokeAngleInc), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            vertices.push(
                outerRim * Math.cos(ang + spokeAngleInc), outerRim * Math.sin(ang + spokeAngleInc), -z,
                innerCircle * Math.cos(ang + spokeAngleInc), innerCircle * Math.sin(ang + spokeAngleInc), z,
                outerRim * Math.cos(ang + spokeAngleInc), outerRim * Math.sin(ang + spokeAngleInc), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
        }
        ang += spokeAngleInc;
    }
}