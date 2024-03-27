/* Assignment 4: So You Think Ants Can Dance
 * CSCI 4611, Spring 2024, University of Minnesota
 * Original C++ implementation by UMN CSCI 4611 Instructors, 2012+
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu>, 2022
 * Significant changes by Daniel Keefe <dfk@umn.edu>, 2023
 * Further development by Evan Suma Rosenberg <suma@umn.edu>, 2024
 * PUBLIC DISTRIBUTION OF SOURCE CODE OUTSIDE OF CSCI 4611 IS PROHIBITED
 */ 

import * as gfx from 'gophergfx'

/**
 * This class should draw an Ant or some other interesting custom 3D character by
 * adding geometry to the bones of the character.  We will assume the character's
 * skeleton is a humanoid skeleton in the CMU MoCap database format.  So, you can
 * selectively add geometry to the bone by checking the name of the bone using an
 * "if" statement as demonstrated below.
 */

export class AntCharacterGeometry
{
    constructor()
    {
 
    }

    public createGeometry(skeleton: gfx.Skeleton): void
    {
        // Call the recursive method for each root bone
        skeleton.children.forEach((child: gfx.Node3) => {
            if(child instanceof gfx.Bone)
                this.createGeometryRecursive(child);
        });
    }

    private createGeometryRecursive(bone: gfx.Bone): void
    {
        
        // PART 3: Create a character!
        // For this part, create a convincing custom character out of basic
        // geometries. Start by creating a basic representation for *every* bone
        // (like you did for the skeleton character), and add additional
        // geometries for specific parts of the skeleton. We suggest drawing
        // geometries for at least the following parts (defined in the if
        // statement below):
        // - lowerback
        // - upperbackback
        // - thorax
        // - head
        //
        // A full list of available bones (and their hierarchical relationships)
        // can be seen in the skeleton files, for example /public/assets/data/05.asf.
        //
        // Lastly, add a face to the character! The character's face should
        // demonstrate your knowledge of composing transformations; at least one
        // part of the face should adjust the position, the rotation, and the
        // scale (like the antennae on the instructor solution).

        if (bone.name == 'head') {
            const head = gfx.Geometry3Factory.createSphere(0.15);
            head.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            head.position.set(0,0,0);
            bone.add(head);
        } else if (bone.name == 'thorax') {
            const neckIsh = gfx.Geometry3Factory.createCylinder(10, 0.05, bone.length);
            neckIsh.position.copy(bone.position);
            neckIsh.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            bone.add(neckIsh);
        } else if (bone.name == 'upperback') {
            const upperBack = gfx.Geometry3Factory.createSphere(0.15);
            upperBack.position.copy(bone.position);
            upperBack.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            bone.add(upperBack);
        } else if (bone.name == 'lowerback') {
            const lowerback = gfx.Geometry3Factory.createSphere(0.13);
            lowerback.position.copy(bone.position);
            lowerback.position.add(new gfx.Vector3(0,-0.1,0));
            lowerback.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            bone.add(lowerback);
        } else {
            const bodyPart = gfx.Geometry3Factory.createBox();
            bodyPart.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(0.1, bone.length, 0.1));
            const R = gfx.Matrix4.makeAlign(new gfx.Vector3(0, 1, 0), bone.direction);
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -bone.length/2, 0));
            const M = gfx.Matrix4.multiplyAll(R, T, S);
            bodyPart.setLocalToParentMatrix(M, false);
    
            bone.add(bodyPart);

        }

        // PART 3.1: Draw specific parts of the character
        if (bone.name == 'thorax')
        {
            const tail = gfx.Geometry3Factory.createCone(0.05,0.2);
            tail.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            tail.rotation.setRotationX(gfx.MathUtils.degreesToRadians(-90));
            tail.position.copy(bone.position);
            tail.position.add(new gfx.Vector3(0,-0.35,-0.2));
            bone.add(tail);
        } 
        else if (bone.name == 'head')
        {
            // PART 3.2: Add a face to the character
            const ears = gfx.Geometry3Factory.createBox(0.025,0.09,0.30);
            ears.material.setColor(new gfx.Color(255/255, 229/255, 189/255));
            ears.position.copy(bone.position);
            ears.position.add(new gfx.Vector3(0,0.02,0));
            ears.rotation.setRotationY(gfx.MathUtils.degreesToRadians(90));
            bone.add(ears);

            const mouth = gfx.Geometry3Factory.createSphere(0.075);
            mouth.material.setColor(new gfx.Color(255/255, 203/255, 120/255));
            mouth.position.set(0, -0.05, 0.12);
            bone.add(mouth);

            const nose = gfx.Geometry3Factory.createSphere(0.02);
            nose.material.setColor(gfx.Color.BLACK);
            nose.position.set(0,0,0.08);
            mouth.add(nose);

            const eye = gfx.Geometry3Factory.createSphere(0.03);
            eye.material.setColor(gfx.Color.BLACK);

            const leftEye = eye.createInstance();
            leftEye.position.set(0.05,0.01,0.125);

            const rightEye = eye.createInstance();
            rightEye.position.set(-0.05,0.01,0.125);
            bone.add(leftEye);
            bone.add(rightEye)

            const hat = gfx.Geometry3Factory.createCone(0.4,0.15);
            hat.material.setColor(new gfx.Color(255/255, 232/255, 130/255));
            hat.position.copy(bone.position);
            hat.position.add(new gfx.Vector3(0,0.01,0));
            hat.rotation.setRotationX(gfx.MathUtils.degreesToRadians(-20));
            bone.add(hat);
        } else if (bone.name == 'lhand') {
            const swordHandle = gfx.Geometry3Factory.createCylinder(10, 0.025, 0.35);
            swordHandle.position.copy(gfx.Vector3.add(bone.position, new gfx.Vector3(0,0.05,0)));
            swordHandle.rotation.setRotationX(gfx.MathUtils.degreesToRadians(45));

            const swordHilt = gfx.Geometry3Factory.createBox(0.4,0.1,0.05);
            swordHilt.position.set(0,0.2,0);
            swordHandle.add(swordHilt);

            const swordBlade = gfx.Geometry3Factory.createBox(0.1,1,0.005);
            swordBlade.position.set(0,0.5,0);
            swordHilt.add(swordBlade);

            bone.add(swordHandle);
        }

        bone.children.forEach((child: gfx.Node3) => {
            if(child instanceof gfx.Bone)
                this.createGeometryRecursive(child);
        });

    }
}