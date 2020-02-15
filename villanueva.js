//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function jenzelVillanuevaGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


    ////////////////////////////
    // Making gear triangles

    var n = numTeeth * 2;
    var s = numSpokes * 2;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var ringInRad = rad * 0.9; // radius for a gear "ring" piece
    var centerRad = rad * 0.3; // radius used for the center piece
    var innerRingRad = rad * 0.95; // radius inside ring for slight extension of spoke length
    var innerCenterRad = rad * 0.2; // radius inside center for slight extension of spoke length
    var angInc = 2*3.14159/n; // angle increment used for determining tooth placement and size
    var angIncS = 2*3.14159/s; // angle increment used for determining spoke placement
    var toothSlant = 0.04; // inward tooth slant for gear tooth faces
    var ang = 0;
    var z = 0.1;

    // universal gear color
    var gearR = 0.54;
    var gearG = 0.32;
    var gearB = 0.16;

    var i;       //  coin face, front and back
    for (i = 0; i < n; i++) {

        var mat = new Learn_webgl_matrix();
        var rotateMat =  mat.create();
        mat.rotate(rotateMat, 180, 0,1,0);

        var vec4 = new Learn_webgl_point4();

        // coin face ring tri1
        //
        //   |\
        //   |_\
        //

        var v1 = vec4.create(rad*Math.cos(ang), rad*Math.sin(ang), z);
        var v2 = vec4.create(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z);
        var v3 = vec4.create(ringInRad*Math.cos(ang+angInc), ringInRad*Math.sin(ang+angInc), z);

        // coin face ring tri2
        //   ___
        //   \ |
        //    \|
        //

        var v4 = v1;
        var v5 = v3;
        var v6 = vec4.create(ringInRad*Math.cos(ang), ringInRad*Math.sin(ang), z);
        
        // coin face center circle
        var v7 = vec4.create(0,0,z);
        var v8 = vec4.create(centerRad*Math.cos(ang), centerRad*Math.sin(ang), z);
        var v9 = vec4.create(centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc), z);

        // rotate front for back face
        var backV1 = vec4.create(); // tri1
        mat.multiplyP4(backV1,rotateMat,v1);
        var backV2 = vec4.create();
        mat.multiplyP4(backV2,rotateMat,v2);
        var backV3 = vec4.create();
        mat.multiplyP4(backV3,rotateMat,v3);
        var backV4 = vec4.create(); // tri2
        mat.multiplyP4(backV4,rotateMat,v4);
        var backV5 = vec4.create();
        mat.multiplyP4(backV5,rotateMat,v5);
        var backV6 = vec4.create();
        mat.multiplyP4(backV6,rotateMat,v6);
        var backV7 = vec4.create(); // center circle
        mat.multiplyP4(backV7,rotateMat,v7);
        var backV8 = vec4.create();
        mat.multiplyP4(backV8,rotateMat,v8);
        var backV9 = vec4.create();
        mat.multiplyP4(backV9,rotateMat,v9);

        // front face push, 2 tris facing the same direction can simply use the same normal calculated once
        var norm = calcNormal(  v1[0], v1[1], v1[2],
                                v2[0], v2[1], v2[2],
                                v3[0], v3[1], v3[2]
        );

        vertices.push(  v1[0], v1[1], v1[2],  // tri1
                        v2[0], v2[1], v2[2],          
                        v3[0], v3[1], v3[2]                              
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        vertices.push(  v4[0], v4[1], v4[2],  // tri2
                        v5[0], v5[1], v5[2],          
                        v6[0], v6[1], v6[2]                              
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        vertices.push(  v7[0], v7[1], v7[2],  // center circle
                        v8[0], v8[1], v8[2],          
                        v9[0], v9[1], v9[2]                              
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        // back face push, 2 tris facing the same direction can simply use the same normal calculated once
        var norm = calcNormal(  backV1[0], backV1[1], backV1[2],
                                backV2[0], backV2[1], backV2[2],          
                                backV3[0], backV3[1], backV3[2]
        );

        vertices.push(  backV1[0], backV1[1], backV1[2],  // back tri1
                        backV2[0], backV2[1], backV2[2],          
                        backV3[0], backV3[1], backV3[2]                              
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        vertices.push(  backV4[0], backV4[1], backV4[2],  // back tri2
                        backV5[0], backV5[1], backV5[2],          
                        backV6[0], backV6[1], backV6[2]                              
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        vertices.push(  backV7[0], backV7[1], backV7[2],  // back center circle
                        backV8[0], backV8[1], backV8[2],          
                        backV9[0], backV9[1], backV9[2]                              
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        // increment angle
        ang += angInc;
    }

    for (i = 0; i < n; i++) { // coin ring, inner edges
        // edge near ring, reversed edge normal by swapping v2 and v3
        var norm = calcNormal(  ringInRad*Math.cos(ang),ringInRad*Math.sin(ang),-z, // v1
                                ringInRad*Math.cos(ang+angInc),ringInRad*Math.sin(ang+angInc),z, // v2
                                ringInRad*Math.cos(ang+angInc),ringInRad*Math.sin(ang+angInc),-z // v3
        );
        
        vertices.push(  ringInRad*Math.cos(ang),ringInRad*Math.sin(ang),-z,
                        ringInRad*Math.cos(ang+angInc),ringInRad*Math.sin(ang+angInc),-z,
                        ringInRad*Math.cos(ang+angInc),ringInRad*Math.sin(ang+angInc),z
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        vertices.push(  ringInRad*Math.cos(ang),ringInRad*Math.sin(ang),-z,
                        ringInRad*Math.cos(ang+angInc),ringInRad*Math.sin(ang+angInc),z,
                        ringInRad*Math.cos(ang),ringInRad*Math.sin(ang),z
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        // edge near center
        norm = calcNormal(  centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
                            centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z,
                            centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z
        );

        vertices.push(  centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
                        centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),-z,
                        centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        vertices.push(  centerRad*Math.cos(ang),centerRad*Math.sin(ang),-z,
                        centerRad*Math.cos(ang+angInc),centerRad*Math.sin(ang+angInc),z,
                        centerRad*Math.cos(ang),centerRad*Math.sin(ang),z
        );
        colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
        normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

        // increment angle
        ang += angInc;
    }

    var r;       //  coin face, spokes
    for (r = 0; r < 2; r++) {
        ang = 0; // reset angle
        // alternate spokes
        drawSpoke = false;
        for (i = 0; i < s; i++) {       // spokes
            drawSpoke = !drawSpoke;

            var vec4 = new Learn_webgl_point4();

            var v1 = vec4.create(innerRingRad*Math.cos(ang), innerRingRad*Math.sin(ang), z);
            var v2 = vec4.create(innerRingRad*Math.cos(ang+angInc), innerRingRad*Math.sin(ang+angInc), z);
            var v3 = vec4.create(innerCenterRad*Math.cos(ang+angInc), innerCenterRad*Math.sin(ang+angInc), z);

            var v4 = v1;
            var v5 = v3;
            var v6 = vec4.create(innerCenterRad*Math.cos(ang), innerCenterRad*Math.sin(ang), z);

            if (drawSpoke) {
                if (z > 0) {
                // side 1, "top" wall
                var norm = calcNormal(  centerRad*Math.cos(ang), centerRad*Math.sin(ang),-z,
                                        ringInRad*Math.cos(ang), ringInRad*Math.sin(ang),-z,
                                        ringInRad*Math.cos(ang), ringInRad*Math.sin(ang),z
                );

                vertices.push(  centerRad*Math.cos(ang), centerRad*Math.sin(ang),-z,
                                ringInRad*Math.cos(ang), ringInRad*Math.sin(ang),-z,
                                ringInRad*Math.cos(ang), ringInRad*Math.sin(ang),z
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

                vertices.push(  centerRad*Math.cos(ang), centerRad*Math.sin(ang),-z,
                                ringInRad*Math.cos(ang), ringInRad*Math.sin(ang),z,
                                centerRad*Math.cos(ang), centerRad*Math.sin(ang),z
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

                // side 2, "bottom" wall
                norm = calcNormal(  centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc),z,
                                    ringInRad*Math.cos(ang+angInc), ringInRad*Math.sin(ang+angInc),z,
                                    ringInRad*Math.cos(ang+angInc), ringInRad*Math.sin(ang+angInc),-z
                );
                        
                vertices.push(  centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc),-z,
                                ringInRad*Math.cos(ang+angInc), ringInRad*Math.sin(ang+angInc),-z,
                                ringInRad*Math.cos(ang+angInc), ringInRad*Math.sin(ang+angInc),z
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

                vertices.push(  centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc),-z,
                                ringInRad*Math.cos(ang+angInc), ringInRad*Math.sin(ang+angInc),z,
                                centerRad*Math.cos(ang+angInc), centerRad*Math.sin(ang+angInc),z
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );
                }

                // coin face push
                if (z > 0) {
                    norm = calcNormal(  v1[0], v1[1], v1[2],
                                        v2[0], v2[1], v2[2],          
                                        v3[0], v3[1], v3[2]
                    );
                } else {
                    norm = calcNormal(  v1[0], v1[1], v1[2],
                                        v3[0], v3[1], v3[2], // swap v2 and v3 to reverse normal direction
                                        v2[0], v2[1], v2[2]
                    );
                }

                vertices.push(  v1[0], v1[1], v1[2],  // tri1
                                v2[0], v2[1], v2[2],          
                                v3[0], v3[1], v3[2]                              
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

                vertices.push(  v4[0], v4[1], v4[2],  // tri2
                                v5[0], v5[1], v5[2],          
                                v6[0], v6[1], v6[2]                              
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );


            }
            // increment angle
            ang += angIncS;
        }
        // reverse z to render opposite side
        z = -z;
    }
    z = -z;

    var drawTooth;       // face of the teeth front |_|
    for (r = 0; r < 2; r++) {
        ang = 0;
        drawTooth = false;
  
        for ( i = 0; i < n; i++) {
	         drawTooth = !drawTooth;
	         if (drawTooth) {

                if (z > 0) {
                    var norm = calcNormal(  rad*Math.cos(ang), rad*Math.sin(ang), z,
                                            outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+toothSlant,                        
                                            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z
                                            
                    ); 
                } else {
                    var norm = calcNormal(  rad*Math.cos(ang), rad*Math.sin(ang), z,
                                            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                                            outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+toothSlant
                    ); 
                }
                vertices.push(  rad*Math.cos(ang), rad*Math.sin(ang), z,
                                rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+toothSlant
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  ); 
                
                vertices.push(  rad*Math.cos(ang), rad*Math.sin(ang), z,
                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z+toothSlant,
                                outRad*Math.cos(ang), outRad*Math.sin(ang), z+toothSlant
                );
                colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
                normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  ); 

		     }
	         ang += angInc;
        }
        z = -z;
        toothSlant = -toothSlant;
    }
    z = -z;
    toothSlant = -toothSlant;
   
   ang = 0;                          // coin edge, near teeth |_|
   drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = calcNormal(  rad*Math.cos(ang),rad*Math.sin(ang),-z,
                                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
                                rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z
        );
        
        if (drawTooth) {
            vertices.push(  rad*Math.cos(ang),rad*Math.sin(ang),-z,
                            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
                            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z
            );

            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

            vertices.push(  rad*Math.cos(ang),rad*Math.sin(ang),-z,
                            rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
                            rad*Math.cos(ang),rad*Math.sin(ang),z
            );

            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );
        }

	    ang += angInc;
   }

    ang = 0;
    drawTooth = false;     // tooth roof |_|
    for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
            var norm = calcNormal(  outRad*Math.cos(ang),outRad*Math.sin(ang),-z-toothSlant,
                                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z-toothSlant,
                                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+toothSlant
            );

            vertices.push(  outRad*Math.cos(ang),outRad*Math.sin(ang),-z-toothSlant,
                            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z-toothSlant,
                            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+toothSlant
            );

            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

            vertices.push(  outRad*Math.cos(ang),outRad*Math.sin(ang),-z-toothSlant,
                            outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z+toothSlant,
                            outRad*Math.cos(ang),outRad*Math.sin(ang),z+toothSlant
            );

            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

		}
	    ang += angInc;
    }

   ang = 0;
   drawTooth = false;
   for ( i = 0; i < n; i++) {   // tooth walls 1/_\ 2/_\
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			// "top" wall, side 1/_\
		    var norm = calcNormal(  rad*Math.cos(ang), rad*Math.sin(ang),-z,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-z-toothSlant,
                                    outRad*Math.cos(ang),outRad*Math.sin(ang),z+toothSlant
            );

            vertices.push(  rad*Math.cos(ang),   rad*Math.sin(ang),-z,
                            outRad*Math.cos(ang),outRad*Math.sin(ang),-z-toothSlant,
                            outRad*Math.cos(ang),outRad*Math.sin(ang),z+toothSlant
            );
            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );

            vertices.push(  rad*Math.cos(ang),   rad*Math.sin(ang),-z,
                            outRad*Math.cos(ang),outRad*Math.sin(ang),z+toothSlant,
                            rad*Math.cos(ang),   rad*Math.sin(ang),z
            );
            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );
            // "bottom" wall, side 2/_\
            norm = calcNormal(  rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),z,
                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),z+toothSlant,
                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),-z-toothSlant
            );
				                  
            vertices.push(  rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                            outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),-z-toothSlant,
                            outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),z+toothSlant
            );
            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );            

            vertices.push(  rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
                            outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc),z+toothSlant,
                            rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),z
            );
            colors.push( gearR,gearG,gearB,  gearR,gearG,gearB,  gearR,gearG,gearB );
            normals.push(  norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2]  );
		}
	    ang += angInc;
   }

    return [vertices,colors,normals];
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