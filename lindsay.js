//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
// You can specify the number of teeth, spokes, and the spoke angle.
function evandlGear(numTeeth = 40, numSpokes = 4, spokeAng = 2 / numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

    var n = numTeeth * 2;
    var innerRad = 0.3;
    var innerRad2 = 0.85
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2 * 3.14159 / n;
    var ang = 0;
    var spokeAngInc = 2 * 3.14159 / numSpokes;
    var z = 0.1;

    var i;       //  coin face, front
    var r;
    for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < n; i++) {
            vertices.push(0, 0, -z,
                innerRad * Math.cos(ang), innerRad * Math.sin(ang), -z,
                innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), -z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);

            if (z < 0) {
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            } else {
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            }

            vertices.push(innerRad2 * Math.cos(ang), innerRad2 * Math.sin(ang), -z,
                innerRad2 * Math.cos(ang + angInc), innerRad2 * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);

            if (z < 0) {
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            } else {
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            }

            vertices.push(innerRad2 * Math.cos(ang), innerRad2 * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);

            if (z < 0) {
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            } else {
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            }

            // Tooth face
            drawTooth = !drawTooth;
            if (drawTooth) {

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2)

                colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)

                if (z > 0) {
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                } else {
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                }

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2);


                colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)

                if (z > 0) {
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                } else {
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                }
            }

            ang += angInc;
        }
        z = -z;
    }

    z = -z;

    // Outer coin tops
    ang = 0;
    drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }

    // Inner coin tops
    ang = 0;
    for (i = 0; i < n; i++) {
        var norm = [innerRad * Math.cos(ang + angInc / 2), innerRad * Math.sin(ang + angInc / 2), 0];
        vertices.push(
            innerRad * Math.cos(ang), innerRad * Math.sin(ang), -z,
            innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), -z,
            innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), z)

        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(
            innerRad * Math.cos(ang), innerRad * Math.sin(ang), -z,
            innerRad * Math.cos(ang + angInc), innerRad * Math.sin(ang + angInc), z,
            innerRad * Math.cos(ang), innerRad * Math.sin(ang), z)

        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        ang += angInc;
    }

    // Inner coin bottoms
    ang = 0;
    for (i = 0; i < n; i++) {
        var norm = [innerRad2 * -Math.cos(ang + angInc / 2), innerRad2 * -Math.sin(ang + angInc / 2), 0];
        vertices.push(
            innerRad2 * Math.cos(ang), innerRad2 * Math.sin(ang), -z,
            innerRad2 * Math.cos(ang + angInc), innerRad2 * Math.sin(ang + angInc), -z,
            innerRad2 * Math.cos(ang + angInc), innerRad2 * Math.sin(ang + angInc), z)

        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(
            innerRad2 * Math.cos(ang), innerRad2 * Math.sin(ang), -z,
            innerRad2 * Math.cos(ang + angInc), innerRad2 * Math.sin(ang + angInc), z,
            innerRad2 * Math.cos(ang), innerRad2 * Math.sin(ang), z)

        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        ang += angInc;
    }

    // Tooth tops
    ang = 0;
    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z / 2,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / 2,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z / 2,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    ang = 0;

    let vector = new Learn_webgl_vector3();

    // Tooth sides
    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            let v1 = vector.create(rad * Math.cos(ang), rad * Math.sin(ang), -z);
            let v2 = vector.create(outRad * Math.cos(ang), outRad * Math.sin(ang), -z);
            let v3 = vector.create(outRad * Math.cos(ang), outRad * Math.sin(ang), z);
            let u = vector.create(); vector.subtract(u, v2, v1);
            let v = vector.create(); vector.subtract(v, v3, v1);
            let norm = vector.create(); vector.crossProduct(norm, u, v); vector.normalize(norm);

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z / 2,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            console.log(`${norm[0]} ${norm[1]} ${norm[2]}`)

            v1 = vector.create(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);
            v2 = vector.create(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z);
            v3 = vector.create(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);
            u = vector.create(); vector.subtract(u, v2, v1);
            v = vector.create(); vector.subtract(v, v3, v1);
            norm = vector.create(); vector.crossProduct(norm, u, v); vector.normalize(norm);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / 2,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
            console.log(`${norm[0]} ${norm[1]} ${norm[2]}`)

        }
        ang += angInc;
    }

    for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < numSpokes; i++) {
            vertices.push(0, 0, -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + spokeAng), rad * Math.sin(ang + spokeAng), -z);

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);

            if (z < 0) {
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            } else {
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
            }

            ang += spokeAngInc;
        }
        z = -z;
    }

    ang = 0;
    for (i = 0; i < numSpokes; i++) {
        let v1 = vector.create(rad * Math.cos(ang), rad * Math.sin(ang), -z);
        let v2 = vector.create(outRad * Math.cos(ang), outRad * Math.sin(ang), -z);
        let v3 = vector.create(outRad * Math.cos(ang), outRad * Math.sin(ang), z);
        let u = vector.create(); vector.subtract(u, v2, v1);
        let v = vector.create(); vector.subtract(v, v3, v1);
        let norm = vector.create(); vector.crossProduct(norm, u, v); vector.normalize(norm);

        vertices.push(0, 0, z,
            0, 0, -z,
            rad * Math.cos(ang + spokeAng), rad * Math.sin(ang + spokeAng), -z);
        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

        vertices.push(0, 0, z,
            rad * Math.cos(ang + spokeAng), rad * Math.sin(ang + spokeAng), z,
            rad * Math.cos(ang + spokeAng), rad * Math.sin(ang + spokeAng), -z);
        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

        vertices.push(0, 0, z,
            0, 0, -z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z);
        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);
        normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);

        vertices.push(0, 0, z,
            rad * Math.cos(ang), rad * Math.sin(ang), z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z);
        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);
        normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);

        ang += spokeAngInc;
    }

    return [vertices, colors, normals]
}