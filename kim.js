//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function kimGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


    ////////////////////////////
    // Making gear triangles

    var n = numTeeth;//controls the number of teeth n/2
    var rad = 1.0; //controls the size of the gear
    var outRad = rad * 1.2; //controls the length of the teeth
    var angInc = 2 * 3.14159 / n;//controls the % of the circle
    var ang = 0; //does nothing atm?
    var z = 0.1;//does nothing atm?


    //CREATES INNER CIRCLE
    var i;
    var temp = rad * 0.3;
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, z,
            temp * Math.cos(ang), temp * Math.sin(ang), z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        ang += angInc;

    }
    var i;
    var temp = rad * 0.3;
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, z,
            temp * Math.cos(ang), temp * Math.sin(ang), z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        ang += angInc;

    }
    temp = rad * 0.3;
    ang = 0;   // coin face, back
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, -z,
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), -z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angInc;
    }

    ang = 0;                          // coin edge
    var drawTooth = true;
    var temp = rad * 0.3;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [temp * Math.cos(ang + angInc / 2), temp * Math.sin(ang + angInc / 2), 0];
        //if (drawTooth) {

        vertices.push(
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z,
            temp * Math.cos(ang), temp * Math.sin(ang), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        //}

        ang += angInc;
    }
    //END OF INNER CIRCLE CREATION

    //OUTER CIRCLE CREATION

    var i;
    var temp = rad * 0.8;
    for (i = 0; i < n; i++) {
        vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
            temp * Math.cos(ang), temp * Math.sin(ang), z,
            1 * Math.cos(ang + angInc), 1 * Math.sin(ang + angInc), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        vertices.push(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
            temp * Math.cos(ang), temp * Math.sin(ang), z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        ang += angInc;

    }

    for (i = 0; i < n; i++) {
        vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), -z,
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            1 * Math.cos(ang + angInc), 1 * Math.sin(ang + angInc), -z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        vertices.push(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), -z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        ang += angInc;

    }


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

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }

    ang = 0;                          // coin edge
    var temp = 0.8
    var drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [temp * Math.cos(ang + angInc / 2), temp * Math.sin(ang + angInc / 2), 0];


        vertices.push(
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(
            temp * Math.cos(ang), temp * Math.sin(ang), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z,
            temp * Math.cos(ang), temp * Math.sin(ang), z)

        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        ang += angInc;
    }
    //END OF OUTER CIRCLE CREATION


    //SLANTED TEETH FACES
    var r;
    var newZ = 0.03;
    for (r = 0; r < 2; r++) {//draws the triangles twice
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < n; i++) {       // face of the teeth
            drawTooth = !drawTooth;
            if (drawTooth) {
                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,//changing to newZ slants inward from the sides
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,//changing to newZ slants inward from the other side
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), newZ)

                colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);




                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), newZ,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), newZ);


                colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

            }
            ang += angInc;
        }
        z = -z;
        newZ = -newZ;
    }

    z = -z;
    //END OF SLANTED TEETH FACES





    //SLANTED TEETH ROOF
    ang = 0;
    drawTooth = false;     // tooth roof
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -newZ,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -newZ,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), newZ)

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -newZ,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), newZ,
                outRad * Math.cos(ang), outRad * Math.sin(ang), newZ)

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    //END OF SLANTED TEETH ROOF


    //SLANTED TEETH WALLS
    ang = 0;

    drawTooth = false;
    for (i = 0; i < n; i++) {   // tooth walls
        drawTooth = !drawTooth;
        if (drawTooth) {


            var norm  = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z);

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), newZ,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -newZ)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -newZ,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])



            var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), newZ,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -newZ)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -newZ,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        }
        ang += angInc;
    }


    //END OF SLANTED TEETH WALLS


    //SPOKES
    var r;
    var temp = 0.3;
    var rad2 = rad - 0.19;
    for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;
        for (i = 0; i < numSpokes; i++) {
            drawTooth = !drawTooth;
            //if (i % Math.floor(n / 4) == 0) {
            //top
            
            var X1 = rad2 * Math.cos(ang);
            var X2 = rad2 * Math.cos(ang + angInc);
            var Y1 = rad2 * Math.sin(ang);
            var Y2 = rad2 * Math.sin(ang + angInc);
            var angle = Math.sqrt(Math.pow((Y2 - Y1), 2) + Math.pow((X2 - X1), 2));
            
            vertices.push(rad2 * Math.cos(ang), rad2 * Math.sin(ang), z,
                rad2 * Math.cos(ang + angInc), rad2 * Math.sin(ang + angInc), z,
                temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z);

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)

            if (z > 0)
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            else
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                
            //bottom
            vertices.push(rad2 * Math.cos(ang), rad2 * Math.sin(ang), z,
                          temp * Math.cos(ang), temp * Math.sin(ang), z,
                          temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z);

            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)

            if (z > 0)
                normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            else
                normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

            //}

            ang += 2 * 3.14159 / numSpokes;

        }
        z = -z;
    }

    z = -z;


    ang = 0;
    drawTooth = false;
    for (i = 0; i < numSpokes; i++) {


        var norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
            outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
            outRad * Math.cos(ang), outRad * Math.sin(ang), z);

        vertices.push(rad2 * Math.cos(ang), rad2 * Math.sin(ang), z,
            rad2 * Math.cos(ang), rad2 * Math.sin(ang), -z,
            temp * Math.cos(ang), temp * Math.sin(ang), z)
        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        vertices.push(rad2 * Math.cos(ang), rad2 * Math.sin(ang), -z,
            temp * Math.cos(ang), temp * Math.sin(ang), z,
            temp * Math.cos(ang), temp * Math.sin(ang), -z)
        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(rad2 * Math.cos(ang + angInc), rad2 * Math.sin(ang + angInc), z,
            rad2 * Math.cos(ang + angInc), rad2 * Math.sin(ang + angInc), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z)
        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        vertices.push(rad2 * Math.cos(ang + angInc), rad2 * Math.sin(ang + angInc), -z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), z,
            temp * Math.cos(ang + angInc), temp * Math.sin(ang + angInc), -z)
        colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])




        ang += 2 * 3.14159 / numSpokes;
    }

    //END OF SPOKES


    return [vertices, colors, normals]
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