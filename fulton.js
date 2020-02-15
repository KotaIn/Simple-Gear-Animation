var toothSlant = 0.8

//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function michaelfultonGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


    ////////////////////////////
    // Making gear triangles

    var n = numTeeth;
    var innerInnerRadius = 0.2;
    var innerRadius = 0.8;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2 * 3.14159 / n;
    var ang = 0;
    var z = 0.1;

    var i;

    for (i = 0; i < n; i++) {         // centerq

        vertices.push(0, 0, z,
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), z,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        vertices.push(0, 0, -z,
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angInc;
    }

    ang = 0;


    for (i = 0; i < n; i++) {     // center knob wrapping
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];

        vertices.push(
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), z,
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        ang += angInc;
    }

    ang = 0;

    for (i = 0; i < n; i++) {     // outer rim wrapping
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];

        vertices.push(
            innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), -z,
            innerRadius * Math.cos(ang + angInc), innerRadius * Math.sin(ang + angInc), -z,
            innerRadius * Math.cos(ang + angInc), innerRadius * Math.sin(ang + angInc), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        vertices.push(
            innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), -z,
            innerRadius * Math.cos(ang + angInc), innerRadius * Math.sin(ang + angInc), z,
            innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        ang += angInc;
    }

    ang = 0;


    for (i = 0; i < n; i++) {         //  coin face, front

        vertices.push(innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), z,
            innerRadius * Math.cos(ang + angInc), innerRadius * Math.sin(ang + angInc), z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        vertices.push(innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), z,
            rad * Math.cos(ang), rad * Math.sin(ang), z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        ang += angInc;
    }

    ang = 0;
    for (i = 0; i < n; i++) {// coin face, back


        vertices.push(innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), -z,
            innerRadius * Math.cos(ang + angInc), innerRadius * Math.sin(ang + angInc), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        vertices.push(innerRadius * Math.cos(ang), innerRadius * Math.sin(ang), -z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z)

        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        ang += angInc;
    }

    /*
       ang = 0;   // coin face, back
       for (i = 0; i < n; i++) {
          
             vertices.push(0,0,-z,
                           rad*Math.cos(ang),rad*Math.sin(ang),-z,
                           rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)
    
             colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
             normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
             ang += angInc;
       }
    
    */



    var r;
    for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < n; i++) {       // face of the teeth
            drawTooth = !drawTooth;
            if (drawTooth) {

                var tPt2 = translatePt(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z, 0, 0, -z * toothSlant)

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    tPt2[0], tPt2[1], tPt2[2])

                colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)

                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                var tPt1 = translatePt(outRad * Math.cos(ang), outRad * Math.sin(ang), z, 0, 0, -z * toothSlant)

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    tPt2[0], tPt2[1], tPt2[2],
                    tPt1[0], tPt1[1], tPt1[2]);


                colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)

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
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }


    ang = 0;
    drawTooth = false;     // tooth roof
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var tPt1 = translatePt(outRad * Math.cos(ang), outRad * Math.sin(ang), -z, 0, 0, z * toothSlant)
            var tPt2 = translatePt(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z, 0, 0, -z * toothSlant)
            var tPt3 = translatePt(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z, 0, 0, z * toothSlant)

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                tPt1[0], tPt1[1], tPt1[2],
                tPt3[0], tPt3[1], tPt3[2],
                tPt2[0], tPt2[1], tPt2[2])

            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            var pt1 = [outRad * Math.cos(ang), outRad * Math.sin(ang), -z]
            var pt2 = [outRad * Math.cos(ang), outRad * Math.sin(ang), z]
            var translatedPt1 = translatePt(pt1[0], pt1[1], pt1[2], 0, 0, z * toothSlant)
            var translatedPt2 = translatePt(pt2[0], pt2[1], pt2[2], 0, 0, -z * toothSlant)

            vertices.push(
                translatedPt1[0], translatedPt1[1], translatedPt1[2],
                tPt2[0], tPt2[1], tPt2[2],
                translatedPt2[0], translatedPt2[1], translatedPt2[2])

            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
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

            var translatedPt1 = translatePt(outRad * Math.cos(ang), outRad * Math.sin(ang), -z, 0, 0, z * toothSlant)
            var translatedPt2 = translatePt(outRad * Math.cos(ang), outRad * Math.sin(ang), z, 0, 0, -z * toothSlant)

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                translatedPt1[0], translatedPt1[1], translatedPt1[2],
                translatedPt2[0], translatedPt2[1], translatedPt2[2])
            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

            translatedPt1 = translatePt(outRad * Math.cos(ang), outRad * Math.sin(ang), z, 0, 0, -z * toothSlant)

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                translatedPt1[0], translatedPt1[1], translatedPt1[2],
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])



            var normal = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

            var tPt2 = translatePt(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z, 0, 0, -z * toothSlant)
            var tPt3 = translatePt(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z, 0, 0, z * toothSlant)

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                tPt3[0], tPt3[1], tPt3[2],
                tPt2[0], tPt2[1], tPt2[2])
            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                tPt2[0], tPt2[1], tPt2[2],
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])


        }
        ang += angInc;



    }

    ang = 0

    for (i = 0; i < numSpokes; i++) {   // spokes front and back

        // spoke front
        vertices.push(
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), z * .99,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z * .99)
        colors.push(1, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 0.5, 0.5)
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        vertices.push(
            rad * Math.cos(ang), rad * Math.sin(ang), z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z * .99,
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);


        // spoke back
        vertices.push(
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z * .99,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        vertices.push(
            rad * Math.cos(ang), rad * Math.sin(ang), -z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z * .99,
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);


        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        // spoke walls side A
        vertices.push(
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z * .99,
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), z * .99,
            rad * Math.cos(ang), rad * Math.sin(ang), z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

        vertices.push(
            innerInnerRadius * Math.cos(ang), innerInnerRadius * Math.sin(ang), -z * .99,
            rad * Math.cos(ang), rad * Math.sin(ang), -z * .99,
            rad * Math.cos(ang), rad * Math.sin(ang), z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);


        norm = [rad * Math.cos(ang + angInc / 2) * -1, rad * Math.sin(ang + angInc / 2), 0];
        // spoke walls side B
        vertices.push(
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z * .99,
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

        vertices.push(
            innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z * .99,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z * .99)
        colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        normals.push(norm[0], norm[1], -norm[2], norm[0], norm[1], -norm[2], norm[0], norm[1], -norm[2]);


        // var normal = calcNormal(innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z,
        //     rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        //     rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);

        // var tPt2 = translatePt(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z, 0, 0, -z * toothSlant)
        // var tPt3 = translatePt(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z, 0, 0, z * toothSlant)

        // vertices.push(
        //     innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z,
        //     rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
        //     rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
        // colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        // normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        // vertices.push(
        //     innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), -z,
        //     tPt2[0], tPt2[1], tPt2[2],
        //     innerInnerRadius * Math.cos(ang + angInc), innerInnerRadius * Math.sin(ang + angInc), z)
        // colors.push(1.0, 0.8, 0.0, 1.0, 0.8, 0.0, 1.0, 0.8, 0.0)
        // normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])



        ang += 1.57;
    }















    return [vertices, colors, normals]
}








function translatePt(x, y, z, dx, dy, dz) {
    var pt = new Learn_webgl_point4()
    var ourPt = pt.create(x, y, z, 1)
    var translatedPt = pt.create(0, 0, 0, 0)

    var mat = new Learn_webgl_matrix()
    var transMat = mat.create()

    mat.translate(transMat, dx, dy, dz)
    mat.multiplyP4(translatedPt, transMat, ourPt)

    return translatedPt
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