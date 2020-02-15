
rgbValues = [218, 165, 32];
newRgbValues = [rgbValues[0]/255, rgbValues[1]/255, rgbValues[2]/255]
g1 = newRgbValues[0]; 
g2= newRgbValues[1]; 
g3 = newRgbValues[2]; 

a1 = g1; 
a2 = g2;
a3 = g3;


b1 = g1;
b2 = g2;
b3 = g3;
function createCoinFace(n,rad,innerrad, ang, angInc, z, vertices, colors, normals) {


    //coin face in the front
    for (i = 0; i < n; i++) {
  
        vertices.push(innerrad*Math.cos(ang) ,innerrad*Math.sin(ang),z,
                    rad*Math.cos(ang) ,rad*Math.sin(ang),z,
                    rad*Math.cos(ang+angInc) ,rad*Math.sin(ang+angInc) ,z)

        //colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        normals.push(0,0,1, 0,0,1, 0,0,1  );
        ang += angInc;
    }

    for (i = 0; i < n; i++) {
        

        vertices.push(innerrad*Math.cos(ang), innerrad*Math.sin(ang) ,z, //the 1      bottom right
                        innerrad*Math.cos(ang  + angInc)  ,innerrad*Math.sin(ang + angInc ) , z,        ///top right
                        rad*Math.cos(ang+angInc) ,rad*Math.sin(ang+angInc)  ,z) // not the 1 don't mess with //top left

        //colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        normals.push(0,0,1, 0,0,1, 0,0,1  );
        ang += angInc;
    }


    //coin face in the back
    for (i = 0; i < n; i++) {
      
        vertices.push(innerrad*Math.cos(ang) ,innerrad*Math.sin(ang),-z,
                      rad*Math.cos(ang) ,rad*Math.sin(ang),-z,
                      rad*Math.cos(ang+angInc) ,rad*Math.sin(ang+angInc) ,-z)
    
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
        ang += angInc;
    }
        for (i = 0; i < n; i++) {
        
    
        vertices.push(innerrad*Math.cos(ang), innerrad*Math.sin(ang) ,-z, //the 1      bottom right
                    innerrad*Math.cos(ang  + angInc)  ,innerrad*Math.sin(ang + angInc ) , -z,        ///top right
                    rad*Math.cos(ang+angInc) ,rad*Math.sin(ang+angInc)  ,-z) // not the 1 don't mess with //top left
    
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
        //colors.push( 1,0,0,  0,1,0,  0,0,1);
        normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
        ang += angInc;
    }
    ang = 0;
}


function createTeethFace (n,rad,outRad, ang, angInc, zsmall, z, vertices, colors, normals, numteeth) {
    var r;
    for (r = 0; r < 2; r++) {
         ang = 0;
         var drawTooth = false;
         
         for ( i = 0; i < numteeth * 2; i++) {       // face of the teeth
              drawTooth = !drawTooth;
              if (drawTooth) {
 
                  vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z, //bleft
                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), zsmall)
 
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
                   
                  if (z > 0)
                       normals.push(0,0,1, 0,0,1, 0,0,1  );    
                  else
                       normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    
 
                 
                  vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), zsmall,
                                outRad*Math.cos(ang), outRad*Math.sin(ang), zsmall);
 
 
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
 
                  if (z > 0)
                       normals.push(0,0,1, 0,0,1, 0,0,1  );    
                  else
                       normals.push(0,0,-1, 0,0,-1, 0,0,-1  );   
 
              }
              ang += angInc;
              
         }
         zsmall = -zsmall;
         z= -z
    }
    //z = -zbig;
}

//top of the ring
function createCoinEdge(n,rad, ang, angInc, z, vertices, colors, normals) {
   var drawTooth = true;
   for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2),rad*Math.sin(ang+angInc/2),0];
        if (drawTooth) {
          
        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(
               rad*Math.cos(ang),rad*Math.sin(ang),-z,
               rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang),rad*Math.sin(ang),z)

        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }

	    ang += angInc;
   }
}

function createToothRoof(n,rad,outRad, ang, angInc, zsmall, z, vertices, colors, normals, numteeth){

   
    ang = 0;
    //z = -.1
    z = -.05
    drawTooth = false;     // tooth roof
    for (i = 0; i < numteeth * 2; i++) {
         drawTooth = !drawTooth;
         if (drawTooth) {
           
         var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];
         vertices.push(
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z)
   
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
         normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
   
         vertices.push(
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z)
   
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
         normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
   
         }
         ang += angInc;
    }
}

function createToothWalls(n,rad,outRad, ang, angInc, zsmall, z, vertices, colors, normals, numteeth) {
    drawTooth = false;
    for ( i = 0; i < numteeth * 2; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
           var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];

		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-zsmall,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-zsmall,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),zsmall);

            
           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-zsmall,
               outRad*Math.cos(ang),outRad*Math.sin(ang),zsmall)
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),zsmall,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             




           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-zsmall,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-zsmall,
				                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),zsmall);
			   
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,//this 1
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-zsmall,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),zsmall) //not change 100%
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),zsmall,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
           

        }
        
        ang += angInc;
        
   }

}

function createCoinInnerRing(n,innerrad, ang, angInc, z, vertices, colors, normals) {
    var drawTooth = true;
    for (i = 0; i < n; i++) {
         drawTooth = !drawTooth;
         var norm = [innerrad*Math.cos(ang+angInc/2),innerrad*Math.sin(ang+angInc/2),0];
         if (drawTooth) {
           
            vertices.push(
                    innerrad*Math.cos(ang) ,innerrad*Math.sin(ang),-z,
                    innerrad*Math.cos(ang+angInc),innerrad*Math.sin(ang+angInc),-z,
                    innerrad*Math.cos(ang+angInc),innerrad*Math.sin(ang+angInc),z)
    
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
    
            vertices.push(
                    innerrad*Math.cos(ang),innerrad*Math.sin(ang),-z,
                    innerrad*Math.cos(ang+angInc),innerrad*Math.sin(ang+angInc),z,
                    innerrad*Math.cos(ang),innerrad*Math.sin(ang),z)
    
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }
 
        ang += angInc;
    }
 
    // coin inner ring other
    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
        
            var norm = [innerrad*Math.cos(ang+angInc/2),innerrad*Math.sin(ang+angInc/2),0];
            vertices.push(
                innerrad*Math.cos(ang), innerrad*Math.sin(ang),-z,
                innerrad*Math.cos(ang+angInc),innerrad*Math.sin(ang+angInc),-z,
                innerrad*Math.cos(ang+angInc),innerrad*Math.sin(ang+angInc),z)
        
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])
        
            vertices.push(
                innerrad*Math.cos(ang),innerrad*Math.sin(ang),-z,
                innerrad*Math.cos(ang+angInc),innerrad*Math.sin(ang+angInc),z,
                innerrad*Math.cos(ang),innerrad*Math.sin(ang),z)
        
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
    
        }
     ang += angInc;
    }
}

function createCenterCoin(n,smallCoinRad, ang, angInc, z, vertices, colors, normals) {
    var i;     
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,z,
                        smallCoinRad*Math.cos(ang),smallCoinRad*Math.sin(ang),z,
                        smallCoinRad*Math.cos(ang+angInc),smallCoinRad*Math.sin(ang+angInc),z)

        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
         ang += angInc;
   }

   ang = 0;
  

   ang = 0;   
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,-z,
                        smallCoinRad*Math.cos(ang),smallCoinRad*Math.sin(ang),-z,
                        smallCoinRad*Math.cos(ang+angInc),smallCoinRad*Math.sin(ang+angInc),-z)

        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
   }


}

function createInnerSpokesFace(n,innerRad, smallCoinRadOuter, ang, angInc, z, vertices, colors, normals, numspokes) {
    var r;
    z = z + .0001;
    for (r = 0; r < 2; r++) {
         ang = ang;
         var drawTooth = false;
         
         for ( i = 0; i < numspokes * 2 ; i++) {       // face of the teeth
              drawTooth = !drawTooth;
              if (drawTooth) {
 
                  vertices.push(smallCoinRadOuter*Math.cos(ang), smallCoinRadOuter*Math.sin(ang), z,
                                smallCoinRadOuter*Math.cos(ang+angInc), smallCoinRadOuter*Math.sin(ang+angInc), z, //bleft
                                innerRad*Math.cos(ang+angInc), innerRad*Math.sin(ang+angInc), z)
 
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
                   
                  if (z > 0)
                       normals.push(0,0,1, 0,0,1, 0,0,1  );    
                  else
                       normals.push(0,0,-1, 0,0,-1, 0,0,-1  );    
 
                 
                  vertices.push(smallCoinRadOuter*Math.cos(ang), smallCoinRadOuter*Math.sin(ang), z,
                                innerRad*Math.cos(ang+angInc), innerRad*Math.sin(ang+angInc), z,
                                innerRad*Math.cos(ang), innerRad*Math.sin(ang), z);
 
 
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
 
                  if (z > 0)
                       normals.push(0,0,1, 0,0,1, 0,0,1  );    
                  else
                       normals.push(0,0,-1, 0,0,-1, 0,0,-1  );   
 
              }
              ang += angInc;
              
         }
         ang -= ((numspokes * 2) * angInc)
         z= -z
    }
}

//technically outRad = innerrad and
//rad = smallCoinRadOuter in this case.
function createInnerSpokesWalls(n,outRad, rad, ang, angInc, z, vertices, colors, normals, numspokes) {
    drawTooth = false;
    for ( i = 0; i < numspokes * 2; i++) {   // tooth walls
	    drawTooth = !drawTooth;
	    if (drawTooth) {
			
           var norm = [outRad*Math.cos(ang+angInc/2),outRad*Math.sin(ang+angInc/2),0];

		   var norm = calcNormal( rad*Math.cos(ang), rad*Math.sin(ang),-z,
			                        outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
				                    outRad*Math.cos(ang),outRad*Math.sin(ang),z);

            
                                    
           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z)
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);

           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


           vertices.push(
               rad*Math.cos(ang),   rad*Math.sin(ang),-z,
               outRad*Math.cos(ang),outRad*Math.sin(ang),z,
               rad*Math.cos(ang),   rad*Math.sin(ang),z)
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             




           var norm = calcNormal( rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc),-z,
			                        outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
				                    outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z);
			   
           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,//this 1
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z) //not change 100%
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             


           vertices.push(
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
               outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),z,
               rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)
        colors.push(g1,g2, g3,  a1, a2, a3,  b1, b2, b3);
           normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
           
        }
        
        ang += angInc;
        
   }
}


function perezGear(numteeth, numspokes) {
    const vertices = [];
    const colors = [];
    const normals = [];

////////////////////////////
// Making gear triangles

   var n = 40;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var innerrad = rad * .9;
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.1; 
   var zsmall = .05;
   var smallCoinRad = rad * .3;
   var smallCoinRadOuter = rad * .4;
   var smallCoinRadInner = rad * .2;
   var i;      
   

   
   createCoinFace(n,rad,innerrad, ang, angInc, z, vertices, colors, normals);
   createTeethFace(n,rad,outRad, ang, angInc, zsmall, z, vertices, colors, normals, numteeth);
   createCoinEdge(n,rad, ang, angInc, z, vertices, colors, normals)
   createToothRoof(n,rad,outRad, ang, angInc, zsmall, z, vertices, colors, normals, numteeth);
   createToothWalls(n,rad,outRad, ang, angInc, zsmall, z, vertices, colors, normals, numteeth);
   createCoinInnerRing(n,innerrad, ang, angInc, z, vertices, colors, normals);
   createCoinInnerRing(n,smallCoinRad, ang, angInc, z, vertices, colors, normals);

   createCoinInnerRing(n,rad, ang, angInc, z, vertices, colors, normals);



   //inner circle
   createCoinFace(n, smallCoinRadOuter, smallCoinRadInner, ang, angInc, z, vertices, colors, normals);
   createCoinInnerRing(n,smallCoinRadOuter, ang, angInc, z, vertices, colors, normals);
   createCoinInnerRing(n,smallCoinRadInner, ang, angInc, z, vertices, colors, normals);

   //spokes
   createInnerSpokesFace(100,rad, smallCoinRadOuter, 90, angInc, z, vertices, colors, normals,numspokes);
   createInnerSpokesWalls(100, innerrad, smallCoinRadOuter, 90, angInc, z, vertices, colors, normals, numspokes);

   //for seeing shading purposes
   //createCoinFace(n, rad, 0, ang, angInc, z, vertices, colors, normals);

   //createOldCircle(vertices, colors, normals)

    return [vertices,colors,normals]
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



   /*
   for (i = 0; i < n; i++) {
      

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


         vertices.push(  newV1[0], newV1[1], newV1[2],  
                         newV2[0], newV2[1], newV2[2],          
                         newV3[0], newV3[1], newV3[2]                              
                       )

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         /// AND WE COULD HAVE ROTATED THE NORMALS
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
         
   }   */





   function createOldCircle(vertices, colors, normals) {

    var n = 40;
   var rad = 1.0;
   var outRad = rad * 1.2;
   var angInc = 2*3.14159/n;
   var ang = 0;
   var z = 0.1;

   var i;       //  coin face, front
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,z,
                       rad*Math.cos(ang),rad*Math.sin(ang),z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z)

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         //colors.push( 1,0,0,  0,1,0,  0,0,1);
         normals.push(0,0,1, 0,0,1, 0,0,1  );
         ang += angInc;
   }

   ang = 0;   // coin face, back
   for (i = 0; i < n; i++) {
      
         vertices.push(0,0,-z,
                       rad*Math.cos(ang),rad*Math.sin(ang),-z,
                       rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z)

         colors.push( 0.5,0.5,0.5,  0.5,0.5,0.5,  0.5,0.5,0.5);
         normals.push(0,0,-1, 0,0,-1, 0,0,-1  );
         ang += angInc;
   }


} 