//This will hold the color to make the gear.
const theColor = {
r: 160 / 255,
  g: 160 / 255,
  b: 160 / 255
};

// This will build a gear based on the user input. This 
// Will allow for correct normal calculation and resizing 
// of the gear.
// 
// Param1: the number of teeth to put along the gear.
// Param2: the number of spokes to put inside the gear.
function ArmoniAthertonGear(numOfTeeth, numOfSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles
   numOfTeeth = numOfTeeth * 2;
   numOfSpokes = numOfSpokes * 2;
   var gearSize = 40;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2*3.14159/gearSize;
   var ang = 0;
   var z = 0.1;

   //Draws the front and back of the spokes faces.
   createCoinFaceAA(ang, angInc, z,  numOfSpokes, vertices, rad * .80, colors, normals);
   createCoinBackAA(ang, angInc, z, numOfSpokes, vertices, rad * .80, colors, normals);
   //This draws the inner part of the gear spokes.
   createToothWallsInnerGearAA(ang, angInc, z, numOfSpokes, vertices, 0, rad, colors, normals);
   createCoinEdgeAA(ang, angInc, z, gearSize, vertices, rad * .80, colors, normals);

   //This will draw all the teeth related things.
   createTeethFaceAA(ang, angInc, z, numOfTeeth, vertices, .93, outRad, colors, normals);
   createToothRoofAA(ang, angInc, z, numOfTeeth, vertices, outRad, colors, normals);
   createToothWallsAA(ang, angInc, z, numOfTeeth, vertices, .93, outRad, colors, normals);

   //This draws the coin edge, currently set to the default size of a gear.
   createCoinEdgeAA(ang, angInc, z, gearSize, vertices, rad, colors, normals);

    //This is for the other parts of the gear that should always be consistent.
    //This draws the outside face ring on my gear.
    createTeethFaceNormalAA(ang, angInc, z, gearSize, vertices, rad * .79, rad, colors, normals);

    //Inner solid circle part of the gear.
    createCoinEdgeAA(ang, angInc, z, gearSize, vertices, rad * .15, colors, normals);
    createTeethFaceNormalAA(ang, angInc, z, gearSize, vertices, 0, rad * .15, colors, normals);


    return [vertices,colors,normals]
  }

  function createCoinFaceAA(ang, angInc, z, numOfSpokes, vertices, rad, colors, normals) {
    if (numOfSpokes > 40) {
      angInc = 2*3.14159/numOfSpokes;
    }
    var i;       //  coin face, front
    for (i = 0; i < numOfSpokes; i++) {
     if ( i % 4 == 1) {
       vertices.push(0.0, 0.0, z,
         rad*Math.cos(ang),rad*Math.sin(ang),z,
         rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

       colors.push(theColor.r,theColor.g, theColor.b,
         theColor.r,theColor.g, theColor.b,
         theColor.r,theColor.g, theColor.b);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
       }
       ang += angInc;
     }
   }

   function createCoinBackAA(ang, angInc, z, numOfSpokes, vertices, rad, colors, normals) {
     if (numOfSpokes > 40) {
       angInc = 2*3.14159/numOfSpokes;
     }
     for (i = 0; i < numOfSpokes; i++) {

       var mat = new Learn_webgl_matrix();
       var rotateMat =  mat.create();
       mat.rotate(rotateMat, 180, 0,1,0);

       var vec4 = new Learn_webgl_point4();

       var v1 = vec4.create(0,0,z);
       var v2 = vec4.create(rad*Math.cos(ang),rad*Math.sin(ang),z);
       var v3 = vec4.create(rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);

       var newV1 = vec4.create();
       mat.multiplyP4(newV1,rotateMat,v1);

       var newV2 = vec4.create();
       mat.multiplyP4(newV2,rotateMat,v2);

       var newV3 = vec4.create();
       mat.multiplyP4(newV3,rotateMat,v3);

       if ( i % 4 == 1) {
        vertices.push(  newV1[0], newV1[1], newV1[2],
         -newV2[0], newV2[1], newV2[2],
         -newV3[0], newV3[1], newV3[2]
         )

         colors.push(theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b);

         /// AND WE COULD HAVE ROTATED THE NORMALS
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
       }
       ang += angInc;
     }
   }

   function createTeethFaceAA(ang, angInc, z, numOfTeeth, vertices, rad, outRad, colors, normals) {
    //This checks if over 40 teeth inputed. If so we need to calculate a new angle.
     if (numOfTeeth > 40) {
       angInc = 2*3.14159/numOfTeeth;
     }

     var r;
     for (r = 0; r < 2; r++) {
      ang = 0;
      var drawTooth = false;
      da = 2.0 * Math.PI / numOfTeeth / 4.0;
          for ( i = 0; i < numOfTeeth; i++) {       // face of the teeth
           drawTooth = !drawTooth;
           if (drawTooth) {

             var normal = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * .5);

             vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
               rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
               outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * .5)

             colors.push(theColor.r,theColor.g, theColor.b,
               theColor.r,theColor.g, theColor.b,
               theColor.r,theColor.g, theColor.b);

             if (z > 0)
               normals.push(-normal[0],-normal[1],-normal[2], -normal[0],-normal[1],-normal[2], -normal[0],-normal[1],-normal[2]);
            else
               normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2]);

            var normal = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
             outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * .5,
             outRad*Math.cos(ang), outRad*Math.sin(ang), z * .5);

            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
             outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * .5,
             outRad*Math.cos(ang), outRad*Math.sin(ang), z * .5);


            colors.push(theColor.r,theColor.g, theColor.b,
             theColor.r,theColor.g, theColor.b,
             theColor.r,theColor.g, theColor.b);

            if (z > 0)
              normals.push(-normal[0],-normal[1],-normal[2],- normal[0],-normal[1],-normal[2], -normal[0],-normal[1],-normal[2]);
            else
              normals.push(normal[0],normal[1],normal[2], normal[0],normal[1],normal[2], normal[0],normal[1],normal[2]) ;
          }
          ang += angInc;
        }
        z = -z;
      }

      z = -z;
    }


    function createTeethFaceNormalAA(ang, angInc, z, numOfTeeth, vertices, rad, outRad, colors, normals) {
     var r;
     for (r = 0; r < 2; r++) {
      ang = 0;
      da = 2.0 * Math.PI / numOfTeeth / 4.0;
          for ( i = 0; i < numOfTeeth; i++) {       // face of the teeth

           vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
             rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
             outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z)

           colors.push(theColor.r,theColor.g, theColor.b,
             theColor.r,theColor.g, theColor.b,
             theColor.r,theColor.g, theColor.b);

           if (z > 0)
            normals.push(0,0,1, 0,0,1, 0,0,1  );
          else
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );

          vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
           outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z,
           outRad*Math.cos(ang), outRad*Math.sin(ang), z);


          colors.push(theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b);

          if (z > 0)
            normals.push(0,0,1, 0,0,1, 0,0,1  );
          else
            normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
          ang += angInc;
        }
        z = -z;
      }

      z = -z;
    }

function createCoinEdgeAA(ang, angInc, z, numOfTeeth, vertices, rad, colors, normals) {                       // coin edge
 var drawTooth = true;
 for (i = 0; i < numOfTeeth; i++) {
        // drawTooth = !drawTooth;
        var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {

          vertices.push(
           rad*Math.cos(ang),rad*Math.sin(ang),-z,
           rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
           rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

          colors.push(theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b);
          normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

          vertices.push(
           rad*Math.cos(ang),rad*Math.sin(ang),-z,
           rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
           rad*Math.cos(ang),rad*Math.sin(ang),z)

          colors.push(theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b,
           theColor.r,theColor.g, theColor.b);
          normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
        }
        ang += angInc;
      }
    }

    function createToothRoofAA(ang, angInc, z, numOfTeeth, vertices, outRad, colors, normals){
      //This checks if over 40 teeth inputed. If so we need to calculate a new angle.
      if (numOfTeeth > 40) {
        angInc = 2 * 3.14159 / numOfTeeth;
      }
      ang = 0;
     drawTooth = false;     // tooth roof

     for (i = 0; i < numOfTeeth; i++) {
      drawTooth = !drawTooth;
      if (drawTooth) {

        // var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
        var norm = [
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
          outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z,
          outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z];
        vertices.push(
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z * .5,
          outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * .5,
          outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5)

        colors.push(theColor.r,theColor.g, theColor.b,
         theColor.r,theColor.g, theColor.b,
         theColor.r,theColor.g, theColor.b);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
          outRad*Math.cos(ang),outRad*Math.sin(ang),-z * .5,
          outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5,
          outRad*Math.cos(ang),outRad*Math.sin(ang),z * .5)

        colors.push(theColor.r,theColor.g, theColor.b,
         theColor.r,theColor.g, theColor.b,
         theColor.r,theColor.g, theColor.b);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

      }
      ang += angInc;
    }
  }

  function createToothWallsAA(ang, angInc, z, numOfTeeth, vertices, rad, outRad, colors, normals) {
    //This checks if over 40 teeth inputed. If so we need to calculate a new angle.
    if (numOfTeeth > 40) {
      angInc = 2*3.14159/numOfTeeth;
    }

   drawTooth = false;
   for ( i = 0; i < numOfTeeth; i++) {   // tooth walls
    drawTooth = !drawTooth;
    if (drawTooth) {

      var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
        outRad*Math.cos(ang),outRad*Math.sin(ang),z);

      vertices.push(
       rad*Math.cos(ang),   rad*Math.sin(ang),-z ,
       outRad*Math.cos(ang),outRad*Math.sin(ang),-z * .5,
       outRad*Math.cos(ang),outRad*Math.sin(ang),z  * .5)
      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


      vertices.push(
       rad*Math.cos(ang),   rad*Math.sin(ang),-z ,
       outRad*Math.cos(ang),outRad*Math.sin(ang),z * .5,
       rad*Math.cos(ang),   rad*Math.sin(ang),z )
      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


      var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z);

      vertices.push(
       rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
       outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z * .5,
       outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5)

      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


      vertices.push(
       rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
       outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z * .5,
       rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)

      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


    }
    ang += angInc;
  }
}

function createToothWallsInnerGearAA(ang, angInc, z, numOfTeeth, vertices, rad, outRad, colors, normals) {
  //This checks if over 40 teeth inputed. If so we need to calculate a new angle.
  if (numOfTeeth > 40) {
    angInc = 2*3.14159/numOfTeeth;
  }
   for ( i = 0; i < numOfTeeth; i++) {   // tooth walls
    if (i % 4 == 1) {

      var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
        outRad*Math.cos(ang),outRad*Math.sin(ang),z);

      vertices.push(
       rad*Math.cos(ang),   rad*Math.sin(ang),-z ,
       outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
       outRad*Math.cos(ang),outRad*Math.sin(ang),z)
      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


      vertices.push(
       rad*Math.cos(ang),   rad*Math.sin(ang),-z ,
       outRad*Math.cos(ang),outRad*Math.sin(ang),z,
       rad*Math.cos(ang),   rad*Math.sin(ang),z )
      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])



      var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z);

      vertices.push(
       rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
       outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
       outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z)
      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


      vertices.push(
       rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
       outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z,
       rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
      colors.push(theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b,
       theColor.r,theColor.g, theColor.b);
      normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


    }
    ang += angInc;
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
