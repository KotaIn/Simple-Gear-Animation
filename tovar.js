//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex

/**
 * 
 * @param {any} numTeeth  The number of gear teeth to draw.
 * @param {any} numSpokes The number of spokes to draw. Has to be no more than double the 
 *                        the number of teeth to draw.
 */
function tovarGear(numTeeth, numSpokes)
{
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

    var i;       //  coin face, front
    for (i = 0; i < n; i++)
    {

        vertices.push(rad * Math.cos(ang - 1), rad * Math.sin(ang - 1), z,
            rad * Math.cos(ang), rad * Math.sin(ang), z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
        colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);


        // inner middle hub, front
        vertices.push(0, 0, z,
            rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, z,
            rad * Math.cos(ang + angInc) / 4, rad * Math.sin(ang + angInc) / 4, z)

        //colors.push(0.2, 0, 0.435, 0.2, 0, 0.435, 0.2, 0, 0.435); // UW Purple
        colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        ang += angInc;
    }

    ang = 0;   // coin face, back
    for (i = 0; i < n; i++)
    {

        vertices.push(rad * Math.cos(ang - 1), rad * Math.sin(ang - 1), -z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z)

        colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);


        // inner middle hub, back
        vertices.push(0, 0, -z,
            rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, -z,
            rad * Math.cos(ang + angInc) / 4, rad * Math.sin(ang + angInc) / 4, -z)

        colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        ang += angInc;
    }

    var j = n / numSpokes;
    var count = 0;
    var r;
    for (r = 0; r < 2; r++)
    {
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < n; i++)
        {       // face of the teeth
            drawTooth = !drawTooth;
            if (drawTooth)
            {

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2) // edge in towards top
                colors.push(.898, .894, .886, .898, .894, .886, .898, .894, .886); // Platinum
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);


                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2, // edge in towards top
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2); // edge in towards top
                colors.push(.898, .894, .886, .898, .894, .886, .898, .894, .886); // Platinum
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);



            }

            // draw spokes
            if (i % j == 0)
            {
                // outside face of spokes
                vertices.push(rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, z,
                    rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                vertices.push(rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, z,
                    rad * Math.cos(ang-1) / 4, rad * Math.sin(ang-1) / 4, z,
                    rad * Math.cos(ang), rad * Math.sin(ang), z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);


                // spoke walls (weird angle side)
                vertices.push(rad * Math.cos(ang - 1) / 4, rad * Math.sin(ang - 1) / 4, z,
                    rad * Math.cos(ang - 1) / 4, rad * Math.sin(ang - 1) / 4, -z,
                    rad * Math.cos(ang), rad * Math.sin(ang), z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                vertices.push(rad * Math.cos(ang - 1) / 4, rad * Math.sin(ang - 1) / 4, -z,
                    rad * Math.cos(ang - 1) / 4, rad * Math.sin(ang - 1) / 4, z,
                    rad * Math.cos(ang), rad * Math.sin(ang), -z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                vertices.push(rad * Math.cos(ang - 1) / 4, rad * Math.sin(ang - 1) / 4, -z,
                    rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang), rad * Math.sin(ang), -z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                vertices.push(rad * Math.cos(ang - 1) / 4, rad * Math.sin(ang - 1) / 4, z,
                    rad * Math.cos(ang), rad * Math.sin(ang), -z,
                    rad * Math.cos(ang), rad * Math.sin(ang), z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                // spoke walls (more normal side)
                vertices.push(rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, -z,
                    rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                vertices.push(rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, z,
                    rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, -z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

                vertices.push(rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
                if (z > 0)
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                else
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                vertices.push(rad * Math.cos(ang) / 4, rad * Math.sin(ang) / 4, -z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z) // edge in towards top
                colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
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

    var j = n / numSpokes;
    var count = 0;
    ang = 0;                          // coin edge
    var drawTooth = true;
    for (i = 0; i < n; i++)
    {
        drawTooth = !drawTooth;
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth)
        {
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            colors.push(1, .8431, 0, 1, .8431, 0, 1, .8431, 0); // Gold
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        // inner hub coin edge (front?)
        vertices.push(
            rad * Math.cos(ang) / 4, rad * Math.sin(ang) /4, -z,
            rad * Math.cos(ang + angInc) /4, rad * Math.sin(ang + angInc)/4, -z,
            rad * Math.cos(ang + angInc)/4, rad * Math.sin(ang + angInc)/4, z)
        colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        // inner hub coin edge (back?)
        vertices.push(
            rad * Math.cos(ang)/4, rad * Math.sin(ang)/4, -z,
            rad * Math.cos(ang + angInc)/4, rad * Math.sin(ang + angInc)/4, z,
            rad * Math.cos(ang)/4, rad * Math.sin(ang)/4, z)
        colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
        normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        // outer hub inside edge (front?)
        vertices.push(
            rad * Math.cos(ang - 1), rad * Math.sin(ang - 1), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
        colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
        // outer hub inside edge (back?)
        vertices.push(
            rad * Math.cos(ang - 1), rad * Math.sin(ang - 1), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
            rad * Math.cos(ang), rad * Math.sin(ang), z)
        colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        // draw spokes
        if (i % j == 0)
        {
            //// front spokes
            //vertices.push(
            //    0, 0, z,
            //    rad * Math.cos(ang), rad * Math.sin(ang), z,
            //    rad * Math.cos(ang), rad * Math.sin(ang), -z)

            //colors.push(0.569, 0.482, 0.298, 0.569, 0.482, 0.298, 0.569, 0.482, 0.298); // UW Met Gold
            //normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            //// back spokes
            //vertices.push(
            //    0, 0, -z,
            //    rad * Math.cos(ang), rad * Math.sin(ang), -z,
            //    rad * Math.cos(ang), rad * Math.sin(ang), z)

            //colors.push(0.569, 0.482, 0.298, 0.569, 0.482, 0.298, 0.569, 0.482, 0.298); // UW Met Gold
            //normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
            //count++;

            // front spokes

        }
        //console.log(count);



        ang += angInc;
    }


    ang = 0;
    drawTooth = false;     // tooth roof
    for (i = 0; i < n; i++)
    {
        drawTooth = !drawTooth;
        if (drawTooth)
        {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z / 2, // edge in towards top
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / 2, // edge in towards top
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2) // edge in towards top

            colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z / 2, // edge in towards top
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2, // edge in towards top
                outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2) // edge in towards top

            colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    ang = 0;

    drawTooth = false;
    for (i = 0; i < n; i++)
    {   // tooth walls
        drawTooth = !drawTooth;
        if (drawTooth)
        {


            var norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z);

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z / 2, // edge in towards top
                outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2) // edge in towards top
            colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z / 2, // edge in towards top
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])



            var norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z / 2, // edge in towards top
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2) // edge in towards top
            colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z / 2, // edge in towards top
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0, 0, 0.502, 0, 0, 0.502, 0, 0, 0.502)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


        }
        ang += angInc;
    }










    return [vertices, colors, normals]
}




















function calcNormal(x1, y1, z1,
    x2, y2, z2,
    x3, y3, z3)
{

    var ux = x2 - x1, uy = y2 - y1, uz = z2 - z1;
    var vx = x3 - x1, vy = y3 - y1, vz = z3 - z1;

    return [uy * vz - uz * vy,
    uz * vx - ux * vz,
    ux * vy - uy * vx];
}