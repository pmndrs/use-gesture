import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { EventDispatcher, Plane, Raycaster, Vector2, Vector3, Matrix4 } from 'three';

class DragControls extends EventDispatcher {
  constructor(_objects, _camera, _domElement) {
    super();

    _defineProperty(this, "enabled", true);

    _defineProperty(this, "transformGroup", false);

    _defineProperty(this, "_objects", void 0);

    _defineProperty(this, "_camera", void 0);

    _defineProperty(this, "_domElement", void 0);

    _defineProperty(this, "_plane", new Plane());

    _defineProperty(this, "_raycaster", new Raycaster());

    _defineProperty(this, "_mouse", new Vector2());

    _defineProperty(this, "_offset", new Vector3());

    _defineProperty(this, "_intersection", new Vector3());

    _defineProperty(this, "_worldPosition", new Vector3());

    _defineProperty(this, "_inverseMatrix", new Matrix4());

    _defineProperty(this, "_intersections", []);

    _defineProperty(this, "_selected", null);

    _defineProperty(this, "_hovered", null);

    _defineProperty(this, "activate", () => {
      this._domElement.addEventListener('pointermove', this.onPointerMove);

      this._domElement.addEventListener('pointerdown', this.onPointerDown);

      this._domElement.addEventListener('pointerup', this.onPointerCancel);

      this._domElement.addEventListener('pointerleave', this.onPointerCancel);

      this._domElement.addEventListener('touchmove', this.onTouchMove);

      this._domElement.addEventListener('touchstart', this.onTouchStart);

      this._domElement.addEventListener('touchend', this.onTouchEnd);
    });

    _defineProperty(this, "deactivate", () => {
      this._domElement.removeEventListener('pointermove', this.onPointerMove);

      this._domElement.removeEventListener('pointerdown', this.onPointerDown);

      this._domElement.removeEventListener('pointerup', this.onPointerCancel);

      this._domElement.removeEventListener('pointerleave', this.onPointerCancel);

      this._domElement.removeEventListener('touchmove', this.onTouchMove);

      this._domElement.removeEventListener('touchstart', this.onTouchStart);

      this._domElement.removeEventListener('touchend', this.onTouchEnd);

      this._domElement.style.cursor = '';
    });

    _defineProperty(this, "dispose", () => this.deactivate());

    _defineProperty(this, "getObjects", () => this._objects);

    _defineProperty(this, "onMouseMove", event => {
      const rect = this._domElement.getBoundingClientRect();

      this._mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
      this._mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this._raycaster.setFromCamera(this._mouse, this._camera);

      if (this._selected && this.enabled) {
        if (this._raycaster.ray.intersectPlane(this._plane, this._intersection)) {
          this._selected.position.copy(this._intersection.sub(this._offset).applyMatrix4(this._inverseMatrix));
        }

        this.dispatchEvent({
          type: 'drag',
          object: this._selected
        });
        return;
      }

      this._intersections.length = 0;

      this._raycaster.setFromCamera(this._mouse, this._camera);

      this._raycaster.intersectObjects(this._objects, true, this._intersections);

      if (this._intersections.length > 0) {
        const object = this._intersections[0].object;

        this._plane.setFromNormalAndCoplanarPoint(this._camera.getWorldDirection(this._plane.normal), this._worldPosition.setFromMatrixPosition(object.matrixWorld));

        if (this._hovered !== object) {
          this.dispatchEvent({
            type: 'hoveron',
            object
          });
          this._domElement.style.cursor = 'pointer';
          this._hovered = object;
        }
      } else {
        if (this._hovered !== null) {
          this.dispatchEvent({
            type: 'hoveroff',
            object: this._hovered
          });
          this._domElement.style.cursor = 'auto';
          this._hovered = null;
        }
      }
    });

    _defineProperty(this, "onMouseDown", () => {
      this._intersections.length = 0;

      this._raycaster.setFromCamera(this._mouse, this._camera);

      this._raycaster.intersectObjects(this._objects, true, this._intersections);

      if (this._intersections.length > 0) {
        this._selected = this.transformGroup === true ? this._objects[0] : this._intersections[0].object;

        if (this._raycaster.ray.intersectPlane(this._plane, this._intersection) && this._selected.parent) {
          this._inverseMatrix.copy(this._selected.parent.matrixWorld).invert();

          this._offset.copy(this._intersection).sub(this._worldPosition.setFromMatrixPosition(this._selected.matrixWorld));
        }

        this._domElement.style.cursor = 'move';
        this.dispatchEvent({
          type: 'dragstart',
          object: this._selected
        });
      }
    });

    _defineProperty(this, "onMouseCancel", () => {
      if (this._selected) {
        this.dispatchEvent({
          type: 'dragend',
          object: this._selected
        });
        this._selected = null;
      }

      this._domElement.style.cursor = this._hovered ? 'pointer' : 'auto';
    });

    _defineProperty(this, "onPointerMove", event => {
      switch (event.pointerType) {
        case 'mouse':
        case 'pen':
          this.onMouseMove(event);
          break;
        // TODO touch
      }
    });

    _defineProperty(this, "onPointerDown", event => {
      switch (event.pointerType) {
        case 'mouse':
        case 'pen':
          this.onMouseDown();
          break;
        // TODO touch
      }
    });

    _defineProperty(this, "onPointerCancel", event => {
      switch (event.pointerType) {
        case 'mouse':
        case 'pen':
          this.onMouseCancel();
          break;
        // TODO touch
      }
    });

    _defineProperty(this, "onTouchMove", event => {
      event.preventDefault();
      const newEvent = event.changedTouches[0];

      const rect = this._domElement.getBoundingClientRect();

      this._mouse.x = (newEvent.clientX - rect.left) / rect.width * 2 - 1;
      this._mouse.y = -((newEvent.clientY - rect.top) / rect.height) * 2 + 1;

      this._raycaster.setFromCamera(this._mouse, this._camera);

      if (this._selected && this.enabled) {
        if (this._raycaster.ray.intersectPlane(this._plane, this._intersection)) {
          this._selected.position.copy(this._intersection.sub(this._offset).applyMatrix4(this._inverseMatrix));
        }

        this.dispatchEvent({
          type: 'drag',
          object: this._selected
        });
        return;
      }
    });

    _defineProperty(this, "onTouchStart", event => {
      event.preventDefault();
      const newEvent = event.changedTouches[0];

      const rect = this._domElement.getBoundingClientRect();

      this._mouse.x = (newEvent.clientX - rect.left) / rect.width * 2 - 1;
      this._mouse.y = -((newEvent.clientY - rect.top) / rect.height) * 2 + 1;
      this._intersections.length = 0;

      this._raycaster.setFromCamera(this._mouse, this._camera);

      this._raycaster.intersectObjects(this._objects, true, this._intersections);

      if (this._intersections.length > 0) {
        this._selected = this.transformGroup === true ? this._objects[0] : this._intersections[0].object;

        this._plane.setFromNormalAndCoplanarPoint(this._camera.getWorldDirection(this._plane.normal), this._worldPosition.setFromMatrixPosition(this._selected.matrixWorld));

        if (this._raycaster.ray.intersectPlane(this._plane, this._intersection) && this._selected.parent) {
          this._inverseMatrix.copy(this._selected.parent.matrixWorld).invert();

          this._offset.copy(this._intersection).sub(this._worldPosition.setFromMatrixPosition(this._selected.matrixWorld));
        }

        this._domElement.style.cursor = 'move';
        this.dispatchEvent({
          type: 'dragstart',
          object: this._selected
        });
      }
    });

    _defineProperty(this, "onTouchEnd", event => {
      event.preventDefault();

      if (this._selected) {
        this.dispatchEvent({
          type: 'dragend',
          object: this._selected
        });
        this._selected = null;
      }

      this._domElement.style.cursor = 'auto';
    });

    this._objects = _objects;
    this._camera = _camera;
    this._domElement = _domElement;
    this.activate();
  }

}

export { DragControls };
