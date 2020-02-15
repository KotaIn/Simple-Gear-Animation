/*
 * Author: Sam Brendel augmented starter code with significant refactoring.
 * Assignment 4, TCSS458, Professor John Mayer.
 * March 3, 2019
*/

//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
/**
 * The gear is customizable for quantity of teeth, quantity of spokes, and width of the gear.
 * Gear scale can be adjusted in gear.js on line# 320.
 * @param {*} quantityTeeth  3 < n < 140
 * @param {*} quantitySpokes 2 < n < 20
 * @param {*} width 0.02 < n < 1
 */
function brendelGear(quantityTeeth, quantitySpokes, width) {
    const vertices = [];
    const colors = [];
    const normals = [];

   ////////////////////////////
   // Making gear triangles
   var n = quantityTeeth*2 || 40;
   var nSpokes = quantitySpokes || 5;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var centerRingFaceRad = 0.25;
   var outerRingRad = rad * 0.8;
   var spokeRad = rad*0.85; // Overlap is intentional.
   const twoPie = 2*3.14159;
   var angInc = twoPie/n;
   var angIncSpoke = 0.3; // Constant.
   var ang = 0;
   var z = width || 0.1;
   var i = 0;
   var r = 0;
   const toothLean = 0.5; // Slants the teeth.

   //Equation -0.04660775 + (2600.634 - -0.04660775)/(1 + (quantityTeeth/0.00000000002082506)^0.3733636)
   if (quantityTeeth > 1 && quantityTeeth <= 3) {
    toothBevel = 0.18;
    } else if (quantityTeeth > 3 && quantityTeeth <= 10) {
        toothBevel = 0.1;
    } else if (quantityTeeth > 10 && quantityTeeth <= 20) {
        toothBevel = 0.05;
    } else if (quantityTeeth > 20 && quantityTeeth <= 30) {
        toothBevel = 0.04;
    } else if (quantityTeeth > 30 && quantityTeeth <= 40) {
        toothBevel = 0.03;
    } else if (quantityTeeth > 40 && quantityTeeth <= 60) {
        toothBevel = 0.02;
    } else if (quantityTeeth > 60) {
        toothBevel = 0.01;
    } else {
        toothBevel = 0.04;
    }

    var drawTooth = false;
    var vec3 = new Learn_webgl_vector3();
    var resolutionFactor = 1;

   // Increases the resoltion of the center ring to help keep a round shape with low quantity of teeth.
   if (quantityTeeth < 8) {
       resolutionFactor *= 6;
   } else if (quantityTeeth < 15) {
        resolutionFactor *= 3;
    }

   //  coin face, back CENTER ring
   for (i = 0; i < n*resolutionFactor; i++) {
         vertices.push(0, 0, z,
            centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang), z,
            centerRingFaceRad*Math.cos(ang+angInc/resolutionFactor), centerRingFaceRad*Math.sin(ang+angInc/resolutionFactor), z)

         color(colors, "COPPER");
         normals.push(0,0,1,  0,0,1,  0,0,1);
         ang += angInc/resolutionFactor;
   }


   // coin face, front CENTER ring
   ang = 0;
   for (i = 0; i < n*resolutionFactor; i++) {
         var mat = new Learn_webgl_matrix();
         var rotateMat =  mat.create();
         mat.rotate(rotateMat, 180, 0, 1, 0);

         var vec4 = new Learn_webgl_point4();
         var v1 = vec4.create(0, 0, z);
         var v2 = vec4.create(centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang), z);
         var v3 = vec4.create(centerRingFaceRad*Math.cos(ang+angInc/resolutionFactor), centerRingFaceRad*Math.sin(ang+angInc/resolutionFactor), z);

         var newV1 = vec4.create();
         mat.multiplyP4(newV1, rotateMat, v1);

         var newV2 = vec4.create();
         mat.multiplyP4(newV2, rotateMat, v2);

         var newV3 = vec4.create();
         mat.multiplyP4(newV3, rotateMat, v3);

         vertices.push(  newV1[0], newV1[1], newV1[2],
                         newV2[0], newV2[1], newV2[2],
                         newV3[0], newV3[1], newV3[2]
                       )

         color(colors, "COPPER");

         /// AND WE COULD HAVE ROTATED THE NORMALS
         normals.push(0,0,-1,  0,0,-1,  0,0,-1);
         ang += angInc/resolutionFactor;
   }

    // coin face, front & back OUTER ring.  Just like teeth.
    for (r = 0; r < 2; r++) {
        ang = 0;
        drawTooth = false;

        for (i = 0; i < n*resolutionFactor; i++) {
            var v1 = new Vertex(outerRingRad*Math.cos(ang), outerRingRad*Math.sin(ang), z);
            var v2 = new Vertex(outerRingRad*Math.cos(ang+angInc), outerRingRad*Math.sin(ang+angInc), z);
            var v3 = new Vertex(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
            vertices.push(v1.x, v1.y, v1.z,
                            v2.x, v2.y, v2.z,
                            v3.x, v3.y, v3.z);

            color(colors, "COPPER");

            var v4 = new Vertex(outerRingRad*Math.cos(ang), outerRingRad*Math.sin(ang), z);
            var v5 = new Vertex(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
            var v6 = new Vertex(rad*Math.cos(ang), rad*Math.sin(ang), z);
            vertices.push(v4.x, v4.y, v4.z,
                v5.x, v5.y, v5.z,
                v6.x, v6.y, v6.z);

            color(colors, "COPPER");

            if (z > 0) {
                normals.push(0,0,1,  0,0,1,  0,0,1);
                normals.push(0,0,1,  0,0,1,  0,0,1);
            } else {
                normals.push(0,0,-1,  0,0,-1,  0,0,-1);
                normals.push(0,0,-1,  0,0,-1,  0,0,-1);
            }

	        ang += angInc;
        }
        z = -z;
   }

    // spoke face, front & back.  Just like teeth face.  Overlap is intentional on the center ring.
    var spokeAngle = twoPie/nSpokes; // start with zero.
    for (r = 0; r < 2; r++) {
        ang = 0;
          for (i = 0; i < nSpokes; i++) {
            var v4 = new Vertex(0, 0, z);
            var v5 = new Vertex(spokeRad*Math.cos(ang+angIncSpoke), spokeRad*Math.sin(ang+angIncSpoke), z);
            var v6 = new Vertex(spokeRad*Math.cos(ang), spokeRad*Math.sin(ang), z);
                vertices.push(v4.x, v4.y, v4.z,
                                v5.x, v5.y, v5.z,
                                v6.x, v6.y, v6.z);

            color(colors, "COPPER");

            if (z > 0) {
                normals.push(0,0,1,  0,0,1,  0,0,1);
            } else {
                normals.push(0,0,-1,  0,0,-1,  0,0,-1);
            }

            ang += spokeAngle;
        }
        z = -z;
    }

    // spoke walls
    ang = 0;
    drawTooth = false;
    spokeAngle = twoPie/nSpokes; // start with zero.
    for (i = 0; i < nSpokes; i++) {
        var v1 = new Vertex(centerRingFaceRad * Math.cos(ang), centerRingFaceRad * Math.sin(ang), -z);
        var v2 = new Vertex(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), -z);
        var v3 = new Vertex(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z);
        var normal = calcNormal(
                                v1.x, v1.y, v1.z,
                                v2.x, v2.y, v2.z,
                                v3.x, v3.y, v3.z);

        vertices.push(
                        v1.x, v1.y, v1.z,
                        v2.x, v2.y, v2.z,
                        v3.x, v3.y, v3.z);

        color(colors, "COPPER");
        normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

        // Wall 1, triangle 2
        var v4 = new Vertex(centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang), -z);
        var v5 = new Vertex(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z);
        var v6 = new Vertex(centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang), z);
        vertices.push(v4.x, v4.y, v4.z,
                        v5.x, v5.y, v5.z,
                        v6.x, v6.y, v6.z)
        color(colors, "COPPER");
        normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])


        // Wall 2, triangle 1
        var v7 = new Vertex(0, 0, -z);
        var v8 = new Vertex(outerRingRad * Math.cos(ang+angIncSpoke), outerRingRad * Math.sin(ang+angIncSpoke), -z);
        var v9 = new Vertex(outerRingRad * Math.cos(ang+angIncSpoke), outerRingRad * Math.sin(ang+angIncSpoke), z);
        var normal = calcNormal(
                                v8.x, v8.y, v8.z,  // Swapped v7 and v8 to fix shading issue, same as teeth walls.
                                v7.x, v7.y, v7.z,
                                v9.x, v9.y, v9.z);

        vertices.push(v7.x, v7.y, v7.z,
                        v8.x, v8.y, v8.z,
                        v9.x, v9.y, v9.z)
        color(colors, "COPPER");
        normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

        // Wall 2, triangle 2
        var v10 = new Vertex(0, 0, -z);
        var v11 = new Vertex(outerRingRad * Math.cos(ang+angIncSpoke), outerRingRad * Math.sin(ang+angIncSpoke), z);
        var v12 = new Vertex(0, 0, z);
        vertices.push(v10.x, v10.y, v10.z,
                        v11.x, v11.y, v11.z,
                        v12.x, v12.y, v12.z)
        color(colors, "COPPER");
        normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

        ang += spokeAngle;
}

    // face of the teeth
    for (r = 0; r < 2; r++) {
        ang = 0;
        drawTooth = false;

        for (i = 0; i < n; i++) {
	         drawTooth = !drawTooth;
            if (drawTooth) {
                var bevelAngle = ang + angInc - toothBevel;
                var zz = 1;
                var v1 = new Vertex(rad * Math.cos(ang), rad * Math.sin(ang), z);
                var v2 = new Vertex(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
                var v3 = new Vertex(outRad * Math.cos(bevelAngle), outRad * Math.sin(bevelAngle), z * toothLean);
                vertices.push(
                    v1.x, v1.y, v1.z,
                    v2.x, v2.y, v2.z,
                    v3.x, v3.y, v3.z);

                vec3.crossProduct(normal, [v2.x, v2.y, v2.z], [v3.x, v3.y, v3.z]); //[v1.x, v1.y, v1.z]

                color(colors, "COPPER");

                zz = (z > 0) ? 1 : -1;
                normals.push(
                    normal[0], normal[1], zz,
                    normal[0], normal[1], zz,
                    normal[0], normal[1], zz);

                var v4 = new Vertex(rad * Math.cos(ang), rad * Math.sin(ang), z);
                var v5 = new Vertex(outRad * Math.cos(bevelAngle), outRad * Math.sin(bevelAngle), z * toothLean);
                var v6 = new Vertex(outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), z * toothLean);
                vertices.push(v4.x, v4.y, v4.z,
                                v5.x, v5.y, v5.z,
                                v6.x, v6.y, v6.z);

                //vec3.crossProduct(normal, [v4.x, v4.y, v4.z], [v5.x, v5.y, v5.z]); // USE THE SAME NORMAL!
                color(colors, "COPPER");

                normals.push(
                    normal[0], normal[1], zz,
                    normal[0], normal[1], zz,
                    normal[0], normal[1], zz);
		     }
	         ang += angInc;
        }
        z = -z;
    }

    z = -z;

    // tooth roof
    ang = 0;
    drawTooth = false;
    for (i = 0;i < n;i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            var normal = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), -z * toothLean,
                outRad * Math.cos(ang + angInc - toothBevel), outRad * Math.sin(ang + angInc - toothBevel), -z * toothLean,
                outRad * Math.cos(ang + angInc - toothBevel), outRad * Math.sin(ang + angInc - toothBevel), z * toothLean)

            color(colors, "COPPER");
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2]);

            vertices.push(
                outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), -z * toothLean,
                outRad * Math.cos(ang + angInc - toothBevel), outRad * Math.sin(ang + angInc - toothBevel), z * toothLean,
                outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), z * toothLean)

            color(colors, "COPPER");
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2]);
        }
        ang += angInc;
    }


    // tooth walls
    ang = 0;
    drawTooth = false;
    for (i = 0;i < n;i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            var v1 = new Vertex(rad * Math.cos(ang), rad * Math.sin(ang), -z);
            var v2 = new Vertex(outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), -z * toothLean);
            var v3 = new Vertex(outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), z * toothLean);

            var normal = calcNormal(v2.x, v2.y, v2.z,  // Swapped v1 and v2 to fix sideways shading issue.
                                    v1.x, v1.y, v1.z,
                                    v3.x, v3.y, v3.z);

            vertices.push(v1.x, v1.y, v1.z,
                          v2.x, v2.y, v2.z,
                          v3.x, v3.y, v3.z)
            color(colors, "COPPER");
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang + toothBevel), outRad * Math.sin(ang + toothBevel), z * toothLean,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            color(colors, "COPPER");
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

            var v4 = new Vertex(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);
            var v5 = new Vertex(outRad * Math.cos(ang + angInc - toothBevel), outRad * Math.sin(ang + angInc - toothBevel), -z * toothLean);
            var v6 = new Vertex(outRad * Math.cos(ang + angInc - toothBevel), outRad * Math.sin(ang + angInc - toothBevel), z * toothLean);
            var normal = calcNormal(v4.x, v4.y, v4.z,
                                    v5.x, v5.y, v5.z,
                                    v6.x, v6.y, v6.z);

            vertices.push(v4.x, v4.y, v4.z,
                          v5.x, v5.y, v5.z,
                          v6.x, v6.y, v6.z)
            color(colors, "COPPER");
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])

            var v7 = new Vertex(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);
            var v8 = new Vertex(outRad * Math.cos(ang + angInc - toothBevel), outRad * Math.sin(ang + angInc - toothBevel), z * toothLean);
            var v9 = new Vertex(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
            vertices.push(v7.x, v7.y, v7.z,
                          v8.x, v8.y, v8.z,
                          v9.x, v9.y, v9.z);
            color(colors, "COPPER");
            normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2])
        }
        ang += angInc;
    }


   // coin edge INNER
   ang = 0;
   for (i = 0; i < n; i++) {
        var normal = [-1.0*rad*Math.cos(ang+angInc/2),-1.0*rad*Math.sin(ang+angInc/2),0]; // Negate the values, different than the outer edge.
        var v1 = new Vertex(outerRingRad*Math.cos(ang),outerRingRad*Math.sin(ang),-z);
        var v2 = new Vertex(outerRingRad*Math.cos(ang+angInc),outerRingRad*Math.sin(ang+angInc),-z);
        var v3 = new Vertex(outerRingRad*Math.cos(ang+angInc),outerRingRad*Math.sin(ang+angInc),z);
        vertices.push(v1.x, v1.y, v1.z,
                      v2.x, v2.y, v2.z,
                      v3.x, v3.y, v3.z);

        color(colors, "COPPER");
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])

        var v4 = new Vertex(outerRingRad*Math.cos(ang),outerRingRad*Math.sin(ang),-z);
        var v5 = new Vertex(outerRingRad*Math.cos(ang+angInc),outerRingRad*Math.sin(ang+angInc),z);
        var v6 = new Vertex(outerRingRad*Math.cos(ang),outerRingRad*Math.sin(ang),z);
        vertices.push(v4.x, v4.y, v4.z,
                      v5.x, v5.y, v5.z,
                      v6.x, v6.y, v6.z);

        color(colors, "COPPER");
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])

	    ang += angInc;
   }

   // coin edge OUTER
   ang = 0;
   drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
	    var normal = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {

        var v1 = new Vertex(rad*Math.cos(ang),rad*Math.sin(ang),-z);
        var v2 = new Vertex(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z);
        var v3 = new Vertex(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);
        vertices.push(v1.x, v1.y, v1.z,
                        v2.x, v2.y, v2.z,
                        v3.x, v3.y, v3.z);

        color(colors, "COPPER");
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])

        var v4 = new Vertex(rad*Math.cos(ang),rad*Math.sin(ang),-z);
        var v5 = new Vertex(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);
        var v6 = new Vertex(rad*Math.cos(ang),rad*Math.sin(ang),z);
        vertices.push(v4.x, v4.y, v4.z,
                        v5.x, v5.y, v5.z,
                        v6.x, v6.y, v6.z);

        color(colors, "COPPER");
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])
        }

	    ang += angInc;
   }

    // coin edge CENTER
    ang = 0;
    drawTooth = true;
    for (i = 0; i < n; i++) {
        var normal = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        var v1 = new Vertex(centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang),-z);
        var v2 = new Vertex(centerRingFaceRad*Math.cos(ang+angInc), centerRingFaceRad*Math.sin(ang+angInc),-z);
        var v3 = new Vertex(centerRingFaceRad*Math.cos(ang+angInc), centerRingFaceRad*Math.sin(ang+angInc),z);
        vertices.push(v1.x, v1.y, v1.z,
                        v2.x, v2.y, v2.z,
                        v3.x, v3.y, v3.z);

        color(colors, "COPPER");
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])

        var v4 = new Vertex(centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang),-z);
        var v5 = new Vertex(centerRingFaceRad*Math.cos(ang+angInc), centerRingFaceRad*Math.sin(ang+angInc),z);
        var v6 = new Vertex(centerRingFaceRad*Math.cos(ang), centerRingFaceRad*Math.sin(ang),z);
        vertices.push(v4.x, v4.y, v4.z,
                        v5.x, v5.y, v5.z,
                        v6.x, v6.y, v6.z);

        color(colors, "COPPER");
        normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2])

        ang += angInc;
    }

    return [vertices,colors,normals]
}

/**
 * Sets the color of your thingy.
 * @param {*} colorsObject The array to push onto.
 * @param {*} theColor The string of the color.
 */
function color(colorsObject, theColor) {
    switch(theColor) {
        case "GRAY":
            colorsObject.push(0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
            break;
        case "RED":
            colorsObject.push(1,0,0,  1,0,0,  1,0,0);
            break;
        case "TEAL":
            colorsObject.push(0,1,1,  0,1,1,  0,1,1);
            break;
        case "GREEN":
            colorsObject.push(0,1,0,  0,1,0,  0,1,0);
            break;
        case "BLUE":
            colorsObject.push(0,0,1,  0,0,1,  0,0,1);
            break;
        case "HOTPINK":
            colorsObject.push(1,0,1,  1,0,1,  1,0,1);
            break;
        case "SILVER":
            colorsObject.push(0.75,0.75,0.75,  0.75,0.75,0.75, 0.75,0.75,0.75);
            break;
        case "PURPLE":
            colorsObject.push(0.6,0.2,0.8,  0.6,0.2,0.8, 0.6,0.2,0.8);
            break;
        case "GOLDENROD":
            colorsObject.push(0.85,0.64,0.13,  0.85,0.64,0.13, 0.85,0.64,0.13); // 218,165,32
            break;
        case "GOLD":
            colorsObject.push(1,0.84,0,  1,0.84,0, 1,0.84,0); // 255,215,0
            break;
        case "COPPER":
            colorsObject.push(0.72,0.45,0.12,  0.72,0.45,0.12, 0.72,0.45,0.12); // 184, 115, 51
            break;
        default:
            colorsObject.push(0,0,0,  0,0,0,  0,0,0.5);
    }
}


function calcNormal(x1, y1,  z1,
                    x2,  y2,  z2,
                    x3,  y3,  z3) {

    var ux = x2-x1, uy = y2-y1, uz = z2-z1;
    var vx = x3-x1, vy = y3-y1, vz = z3-z1;

    return [ uy * vz - uz * vy,
             uz * vx - ux * vz,
             ux * vy - uy * vx];
}

/**
 * Author: Sam Brendel
 */
function Vertex(theX, theY, theZ) {
    this.x = theX;
    this.y = theY;
    this.z = theZ;
}
