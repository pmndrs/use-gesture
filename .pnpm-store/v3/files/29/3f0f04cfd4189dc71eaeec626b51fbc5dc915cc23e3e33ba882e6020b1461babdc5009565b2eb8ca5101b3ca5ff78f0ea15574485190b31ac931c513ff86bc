enum Direction {
    NONE = 0,
    UP,
    LEFT,
    RIGHT,
    DOWN,
}

// Check code against double-entrance into walk (walk=> callback => walk)
export class HilbertCurveBase {
    private _x : number;
    private _y : number;
    private _d : number;
    private _width : number;
    private _height : number;
    private _callback : (x : number, y : number, d : number) => void;
    private _level : number;

    walk(width : number, height : number, visitorCallback : (x : number, y : number, d : number) => void) : void {
        this._x        = 0;
        this._y        = 0;
        this._d        = 0;
        this._width    = width;
        this._height   = height;
        this._callback = visitorCallback;

        const maxBound = Math.max(width, height);

        this._level = (Math.log(maxBound) / Math.log(2) + 1) | 0;
        this._walkHilbert(Direction.UP);
        this._visit(Direction.NONE);
    }

    private _walkHilbert(direction : Direction) {
        if (this._level < 1) return;

        this._level--;
        switch (direction) {
            case Direction.LEFT:
                this._walkHilbert(Direction.UP);
                this._visit(Direction.RIGHT);
                this._walkHilbert(Direction.LEFT);
                this._visit(Direction.DOWN);
                this._walkHilbert(Direction.LEFT);
                this._visit(Direction.LEFT);
                this._walkHilbert(Direction.DOWN);
                break;

            case Direction.RIGHT:
                this._walkHilbert(Direction.DOWN);
                this._visit(Direction.LEFT);
                this._walkHilbert(Direction.RIGHT);
                this._visit(Direction.UP);
                this._walkHilbert(Direction.RIGHT);
                this._visit(Direction.RIGHT);
                this._walkHilbert(Direction.UP);
                break;

            case Direction.UP:
                this._walkHilbert(Direction.LEFT);
                this._visit(Direction.DOWN);
                this._walkHilbert(Direction.UP);
                this._visit(Direction.RIGHT);
                this._walkHilbert(Direction.UP);
                this._visit(Direction.UP);
                this._walkHilbert(Direction.RIGHT);
                break;

            case Direction.DOWN:
                this._walkHilbert(Direction.RIGHT);
                this._visit(Direction.UP);
                this._walkHilbert(Direction.DOWN);
                this._visit(Direction.LEFT);
                this._walkHilbert(Direction.DOWN);
                this._visit(Direction.DOWN);
                this._walkHilbert(Direction.LEFT);
                break;

            default:
                break;
        }
        this._level++;
    }

    private _visit(direction : Direction) : void {
        if (this._x >= 0 && this._x < this._width && this._y >= 0 && this._y < this._height) {
            this._callback(this._x, this._y, this._d);
            this._d++;
        }
        switch (direction) {
            case Direction.LEFT:
                this._x--;
                break;
            case Direction.RIGHT:
                this._x++;
                break;
            case Direction.UP:
                this._y--;
                break;
            case Direction.DOWN:
                this._y++;
                break;
        }
    }
}

