class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load(graphInfo) {
        const points = graphInfo.points.map(p => new Point(p.x, p.y))
        const segments = graphInfo.segments.map(s => new Segment(
            points.find(p => p.equals(s.p1)),
            points.find(p => p.equals(s.p2)),
        ))

        return new Graph(points, segments)
    }

    addPoint(point) {
        this.points.push(point)
    }

    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point)
            return true;
        }
        return false;
    }

    containsPoint(point) {
        return this.points.find(p => p.equals(point))
    }

    addSegment(segment) {
        this.segments.push(segment)
    }

    tryAddSegment(segment) {
        if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
            this.segments.push(segment)
            return true;
        }
        return false;
    }

    containsSegment(segment) {
        return this.segments.find(s => s.equals(segment))
    }

    removePoint(point) {
        this.points.splice(this.points.indexOf(point), 1)
        const relatedSegments = this.getSegmentsWithPoint(point)
        relatedSegments.forEach(s => this.removeSegment(s))
    }

    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment), 1)
    }

    getSegmentsWithPoint(point) {
        const segs = [];
        this.segments.forEach(s => {
            if (s.includes(point)) segs.push(s);
        })
        return segs;
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx)
        }

        for (const point of this.points) {
            point.draw(ctx)
        }
    }
}