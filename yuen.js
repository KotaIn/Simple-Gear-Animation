//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex

// Recommended range for numTeeth: 8-200, numSpokes: 8-200
function yuenGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];

    ////////////////////////////
    // Making gear triangles
    numTeeth *= 2;
    numSpokes *= 4;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2 * 3.14159 / numTeeth;
    var angIncSpokes = 2 * 3.14159 / numSpokes;
    var ang = 0;
    var z = 0.1;
    var toothSlant = 0.3;

    var i;                              //  coin face, front
    var innerCircle = true;
    var oterCircleRad = 0.1;
    var innerCircleRad = 0.8;

    for (i = 0; i < numSpokes; i++) {
        if (i % 2 == 0)
            innerCircle = !innerCircle;

        if (innerCircle) {
            vertices.push(0, 0, z,
                rad * Math.cos(ang), rad * Math.sin(ang), z,
                rad * Math.cos(ang + angIncSpokes), rad * Math.sin(ang + angIncSpokes), z)
            pushColor(colors);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

            var norm = [outRad * Math.cos(ang + angIncSpokes / 2), outRad * Math.sin(ang + angIncSpokes / 2), 0];
            let length = 6;
            // Wall 1
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad / length * Math.cos(ang), outRad / length * Math.sin(ang), -z,
                outRad / length * Math.cos(ang), outRad / length * Math.sin(ang), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            // Wall 2
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad / length * Math.cos(ang), outRad / length * Math.sin(ang), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

            // Wall 3
            vertices.push(
                rad * Math.cos(ang + angIncSpokes), rad * Math.sin(ang + angIncSpokes), -z,
                outRad / length * Math.cos(ang + angIncSpokes), outRad / length * Math.sin(ang + angIncSpokes), -z,
                outRad / length * Math.cos(ang + angIncSpokes), outRad / length * Math.sin(ang + angIncSpokes), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            // Wall 3
            vertices.push(
                rad * Math.cos(ang + angIncSpokes), rad * Math.sin(ang + angIncSpokes), -z,
                outRad / length * Math.cos(ang + angIncSpokes), outRad / length * Math.sin(ang + angIncSpokes), z,
                rad * Math.cos(ang + angIncSpokes), rad * Math.sin(ang + angIncSpokes), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

        } else {
            vertices.push(0, 0, z,
                (rad - innerCircleRad) * Math.cos(ang), (rad - innerCircleRad) * Math.sin(ang), z,
                (rad - innerCircleRad) * Math.cos(ang + angIncSpokes), (rad - innerCircleRad) * Math.sin(ang + angIncSpokes), z);
            pushColor(colors);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

            // Inner circle walls
            var norm = [rad * Math.cos(ang + angIncSpokes / 2), rad * Math.sin(ang + angIncSpokes / 2), 0];

            vertices.push(
                (rad - innerCircleRad) * Math.cos(ang), (rad - innerCircleRad) * Math.sin(ang), -z,
                (rad - innerCircleRad) * Math.cos(ang + angIncSpokes), (rad - innerCircleRad) * Math.sin(ang + angIncSpokes), -z,
                (rad - innerCircleRad) * Math.cos(ang + angIncSpokes), (rad - innerCircleRad) * Math.sin(ang + angIncSpokes), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                (rad - innerCircleRad) * Math.cos(ang), (rad - innerCircleRad) * Math.sin(ang), -z,
                (rad - innerCircleRad) * Math.cos(ang + angIncSpokes), (rad - innerCircleRad) * Math.sin(ang + angIncSpokes), z,
                (rad - innerCircleRad) * Math.cos(ang), (rad - innerCircleRad) * Math.sin(ang), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            //Outer circle
            vertices.push((rad - oterCircleRad) * Math.cos(ang), (rad - oterCircleRad) * Math.sin(ang), z,
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), z,
                (rad - oterCircleRad) * Math.cos(ang + angIncSpokes), (rad - oterCircleRad) * Math.sin(ang + angIncSpokes), z);
            pushColor(colors);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            vertices.push((rad - oterCircleRad) * Math.cos(ang + angIncSpokes), (rad - oterCircleRad) * Math.sin(ang + angIncSpokes), z,
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), z,
                (rad) * Math.cos(ang + angIncSpokes), (rad) * Math.sin(ang + angIncSpokes), z);
            pushColor(colors);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

            vertices.push((rad - oterCircleRad) * Math.cos(ang), (rad - oterCircleRad) * Math.sin(ang), -z,   // Back outercircle
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), -z,
                (rad - oterCircleRad) * Math.cos(ang + angIncSpokes), (rad - oterCircleRad) * Math.sin(ang + angIncSpokes), -z);
            pushColor(colors);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            vertices.push((rad - oterCircleRad) * Math.cos(ang + angIncSpokes), (rad - oterCircleRad) * Math.sin(ang + angIncSpokes), -z,
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), -z,
                (rad) * Math.cos(ang + angIncSpokes), (rad) * Math.sin(ang + angIncSpokes), -z);
            pushColor(colors);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

            //Outer circle walls
            vertices.push(
                (rad - oterCircleRad) * Math.cos(ang), (rad - oterCircleRad) * Math.sin(ang), -z,
                (rad - oterCircleRad) * Math.cos(ang + angIncSpokes),  (rad - oterCircleRad)* Math.sin(ang + angIncSpokes), -z,
                (rad - oterCircleRad) * Math.cos(ang + angIncSpokes), (rad - oterCircleRad) * Math.sin(ang + angIncSpokes), z);
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
            vertices.push(
                (rad - oterCircleRad) * Math.cos(ang), (rad - oterCircleRad) * Math.sin(ang), -z,
                (rad - oterCircleRad) * Math.cos(ang + angIncSpokes),  (rad - oterCircleRad)* Math.sin(ang + angIncSpokes), z,
                (rad - oterCircleRad) * Math.cos(ang), (rad - oterCircleRad) * Math.sin(ang), z);
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angIncSpokes;
    }
    ang = 0;                        // coin face, back
    for (i = 0; i < numSpokes; i++) {
        if (i % 2 == 0)
            innerCircle = !innerCircle;

        if (innerCircle) {
            vertices.push(0, 0, -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angIncSpokes), rad * Math.sin(ang + angIncSpokes), -z)
        } else {
            vertices.push(0, 0, -z,
                (rad - innerCircleRad) * Math.cos(ang), (rad - innerCircleRad) * Math.sin(ang), -z,
                (rad - innerCircleRad) * Math.cos(ang + angIncSpokes), (rad - innerCircleRad) * Math.sin(ang + angIncSpokes), -z);
        }
        pushColor(colors);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angIncSpokes;
    }

    var r;
    for (r = 0; r < 2; r++) {
        ang = 0;

        var drawTooth = false;

        for (i = 0; i < numTeeth; i++) {       // face of the teeth
            drawTooth = !drawTooth;
            if (drawTooth) {

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * toothSlant)

                pushColor(colors);

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * toothSlant,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z * toothSlant);


                pushColor(colors);

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

    ang = 0;                          // coin edge
    var drawTooth = true;
    for (i = 0; i < numTeeth; i++) {
        drawTooth = !drawTooth;
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), -z,
                (rad) * Math.cos(ang + angInc), (rad) * Math.sin(ang + angInc), -z,
                (rad) * Math.cos(ang + angInc), (rad) * Math.sin(ang + angInc), z)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), -z,
                (rad) * Math.cos(ang + angInc), (rad) * Math.sin(ang + angInc), z,
                (rad) * Math.cos(ang), (rad) * Math.sin(ang), z)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }


    ang = 0;
    drawTooth = false;     // tooth roof
    for (i = 0; i < numTeeth; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * toothSlant,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z * toothSlant,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * toothSlant)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * toothSlant,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * toothSlant,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * toothSlant)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    ang = 0;
    drawTooth = false;
    for (i = 0; i < numTeeth; i++) {   // tooth walls
        drawTooth = !drawTooth;
        if (drawTooth) {
            // Wall 1
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * toothSlant,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * toothSlant)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            // Wall 2
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * toothSlant,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

            // Wall 3
            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z * toothSlant,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * toothSlant)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            // Wall 4
            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * toothSlant,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }
        ang += angInc;
    }
    return [vertices, colors, normals]
}

function pushColor(colors) {
    // colors.push(1, 215/255, 0, 1, 215/255, 0, 1, 215/255, 0);    //gold rgb(255,215,0)
    // colors.push(218/255, 165/255, 32/255, 218/255, 165/255, 32/255, 218/255, 165/255, 32/255);    //gold rod 	rgb(218,165,32)
    colors.push(184/255, 115/255, 51/255, 184/255, 115/255, 51/255,184/255, 115/255, 51/255 );  // copper 184, 115, 51
}

function calcNormal(x1, y1, z1,
    x2, y2, z2,
    x3, y3, z3) {

    var ux = x2 - x1, uy = y2 - y1, uz = z2 - z1;
    var vx = x3 - x1, vy = y3 - y1, vz = z3 - z1;

    return [uy * vz - uz * vy,
    uz * vx - ux * vz,
    ux * vy - uy * vx];
}