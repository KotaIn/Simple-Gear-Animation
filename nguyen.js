//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex

var n = 40;
var rad = 1.0;
var outRad = rad * 1.2;
var angInc = 2 * 3.14159 / n;
var ang = 0;
var z = 0.05;
var zDimension = 0.055;
var inCircle = rad / 3;
var out = rad * 0.85;
var spokes, spokeAnc;


function anhnguyenGear(numTeeth, numSpokes) {

    self.n = numTeeth * 2;
    self.spokes = numSpokes * 2;
    self.spokeAnc = 2 * 3.141598 / self.spokes;
    self.angInc = 2 * 3.141598 / self.n;

    const vertices = [];
    const colors = [];
    const normals = [];




    function calcNormal(x1, y1, z1,
        x2, y2, z2,
        x3, y3, z3) {

        var ux = x2 - x1, uy = y2 - y1, uz = z2 - z1;
        var vx = x3 - x1, vy = y3 - y1, vz = z3 - z1;

        return [uy * vz - uz * vy,
        uz * vx - ux * vz,
        ux * vy - uy * vx];
    }

    ////////////////////////////
    // Making gear triangles
    var i;       //  coin face, front
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, z,
            inCircle * Math.cos(ang), inCircle * Math.sin(ang), z,
            inCircle * Math.cos(ang + angInc), inCircle * Math.sin(ang + angInc), z)

        colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);

        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        ang += angInc;
    }

    ang = 0;   // coin face, back
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, -z,
            inCircle * Math.cos(ang), inCircle * Math.sin(ang), -z,
            inCircle * Math.cos(ang + angInc), inCircle * Math.sin(ang + angInc), -z)

        colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angInc;
    }

    coinEdgeNG(inCircle, vertices, colors, normals, false);
    coinEdgeNG(out, vertices, colors, normals, true);
    coinEdgeNG(rad, vertices, colors, normals, false);

    ang = 0;
    for (i = 0; i < n; i++) {


        var mat = new Learn_webgl_matrix();
        var rotateMat = mat.create();
        mat.rotate(rotateMat, 180, 0, 1, 0);

        var vec4 = new Learn_webgl_point4();
        var v1 = vec4.create(0, 0, z);
        var v2 = vec4.create(inCircle * Math.cos(ang), inCircle * Math.sin(ang), z);
        var v3 = vec4.create(inCircle * Math.cos(ang + angInc), inCircle * Math.sin(ang + angInc), z);

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

        colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        /// AND WE COULD HAVE ROTATED THE NORMALS
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angInc;
    }




    //BackSpoke
    ang = 0;
    drawTooth = false;
    for (var i = 0; i < spokes; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            vertices.push(0, 0, -z,
                rad * Math.cos(ang), out * Math.sin(ang), -z,
                rad * Math.cos(ang + spokeAnc), rad * Math.sin(ang + spokeAnc), -z)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        }
        ang += spokeAnc;
    }

    //SideSpoke
    ang = 0;
    drawTooth = false;
    for (i = 0; i < spokes; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            var norm = [inCircle * Math.cos(ang + angInc / 2), inCircle * Math.sin(ang + spokeAnc / 2), 0];
            vertices.push(
                out * Math.cos(ang), out * Math.sin(ang), -z,
                inCircle * Math.cos(ang), inCircle * Math.sin(ang), -z,
                inCircle * Math.cos(ang), inCircle * Math.sin(ang), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            vertices.push(
                out * Math.cos(ang), out * Math.sin(ang), -z,
                inCircle * Math.cos(ang), inCircle * Math.sin(ang), z,
                out * Math.cos(ang), out * Math.sin(ang), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            vertices.push(
                out * Math.cos(ang + spokeAnc), out * Math.sin(ang + spokeAnc), -z,
                inCircle * Math.cos(ang + spokeAnc), inCircle * Math.sin(ang + spokeAnc), -z,
                inCircle * Math.cos(ang + spokeAnc), inCircle * Math.sin(ang + spokeAnc), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            vertices.push(
                out * Math.cos(ang + spokeAnc), out * Math.sin(ang + spokeAnc), -z,
                inCircle * Math.cos(ang + spokeAnc), inCircle * Math.sin(ang + spokeAnc), z,
                out * Math.cos(ang + spokeAnc), out * Math.sin(ang + spokeAnc), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
        }
        ang += spokeAnc;
    }

    //FrontSpoke
    ang = 0;
    drawTooth = false;
    for (var i = 0; i < spokes; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            vertices.push(0, 0, z,
                rad * Math.cos(ang), out * Math.sin(ang), z,
                rad * Math.cos(ang + spokeAnc), rad * Math.sin(ang + spokeAnc), z)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        }
        ang += spokeAnc;
    }

    var r;
    for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < n; i++) {       // face of the teeth
            drawTooth = !drawTooth;
            vertices.push(out * Math.cos(ang), out * Math.sin(ang), z,
                out * Math.cos(ang + angInc), out * Math.sin(ang + angInc), z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)

            if (z > 0)
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            else
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            vertices.push(out * Math.cos(ang), out * Math.sin(ang), z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z);

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            if (z > 0)
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            else
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            if (drawTooth) {

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - zDimension)

                colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z - zDimension,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z - zDimension);


                colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

            }
            ang += angInc;
        }
        z = -z;
        zDimension = -1 * zDimension;
    }

    z = -z;

    ang = 0;                          // coin edge
    var drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }

    ang = 0;
    drawTooth = false;     // tooth roof
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z - zDimension,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z - zDimension,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zDimension)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z - zDimension,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zDimension,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z + zDimension)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    ang = 0;

    drawTooth = false;
    for (i = 0; i < n; i++) {   // tooth walls
        drawTooth = !drawTooth;
        if (drawTooth) {


            var normal = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z);

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z - zDimension,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z + zDimension)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z + zDimension,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])



            var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z - zDimension,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zDimension)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z + zDimension,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        }
        ang += angInc;
    }
    return [vertices, colors, normals]
}


function coinEdgeNG(x, vertices, colors, normals, isOut) {
    ang = 0;                          // coin edge
    var drawTooth = true;
    var i;

    for (i = 0; i < n * 2; i++) {

        drawTooth = !drawTooth;

        var norm = [x * Math.cos(ang + angInc / 2), x * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                x * Math.cos(ang), x * Math.sin(ang), -z,
                x * Math.cos(ang + angInc), x * Math.sin(ang + angInc), -z,
                x * Math.cos(ang + angInc), x * Math.sin(ang + angInc), z)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)

            if (!isOut) {
                normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            } else {
                normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])

            }


            vertices.push(
                x * Math.cos(ang), x * Math.sin(ang), -z,
                x * Math.cos(ang + angInc), x * Math.sin(ang + angInc), z,
                x * Math.cos(ang), x * Math.sin(ang), z)

            colors.push(0.831, 0.686, 0.216, 0.831, 0.686, 0.216, 0.831, 0.686, 0.216)
            if (!isOut) {
                normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            } else {
                normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])

            }


        }
        ang += angInc / 2;
    }
}