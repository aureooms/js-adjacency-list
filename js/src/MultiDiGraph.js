
/**
 * Complexity of each update operation in comments for
 * classical Doubly Linked List and Hash Map implementations.
 * Complexity in O(.) notation is most likely amortized time
 * for operation involving the successors and predecessors maps.
 */

const MultiDiGraph = function ( List , Map ) {

	/**
	 * O(1)
	 */
	const Graph = function ( ) {

		this.V = new List( ) ;

		this.succ = new Map( ) ;
		this.pred = new Map( ) ;

	} ;

	/**
	 * O(1)
	 */
	Graph.prototype.vadd = function ( ) {

		const v = new DiVertex( ) ;

		this.succ.set( v , new List( ) ) ;
		this.pred.set( v , new List( ) ) ;

		v.iterator = this.V.push( v ) ;

		return v ;

	} ;

	/**
	 * O(n) where n is the degree of v
	 */
	Graph.prototype.vdel = function ( v ) {

		// remove all ingoing and outgoing edges
		for ( let e of  this.initr( v ) ) this.edel( e ) ;
		for ( let e of this.outitr( v ) ) this.edel( e ) ;

		this.pred.delete( v ) ;
		this.succ.delete( v ) ;

		// remove vertex
		this.V.erase( v.iterator ) ;

	} ;

	/**
	 * O(1)
	 */
	Graph.prototype.eadd = function ( u , v ) {

		const uv = new DiEdge( u , v , this.succ.get( u ) ) ;
		const vu = new DiEdge( v , u , this.pred.get( v ) ) ;

		// add to edge list of u
		uv.iterator = uv.list.push( uv ) ;

		// add to edge list of v
		vu.iterator = vu.list.push( vu ) ;

		// set twin
		uv.twin = vu ;
		vu.twin = uv ;

		return uv ;

	} ;

	/**
	 * O(1)
	 */
	Graph.prototype.edel = function ( e ) {

		e.list.erase( e.iterator ) ;
		e.twin.list.erase( e.twin.iterator ) ;

	} ;


	Graph.prototype.vitr = function* ( ) {

		yield* this.V ;

	} ;

	Graph.prototype.eitr = function* ( ) {

		for ( let [ _ , edges ] of this.succ ) yield* edges ;

	} ;

	Graph.prototype.iitr = function* ( v ) {

		yield* this.initr( v ) ;
		yield* this.outitr( v ) ;

	} ;

	Graph.prototype.initr = function* ( v ) {

		yield* this.pred.get( v ) ;

	} ;

	Graph.prototype.outitr = function* ( v ) {

		yield* this.succ.get( v ) ;

	} ;

	Graph.prototype.nitr = function* ( u ) {

		yield* this.dsitr( u ) ;
		yield* this.dpitr( u ) ;

	} ;

	Graph.prototype.dsitr = function* ( u ) {

		for ( let { v } of this.succ.get( u ) ) yield v ;

	} ;

	Graph.prototype.dpitr = function* ( u ) {

		for ( let { v } of this.pred.get( u ) ) yield v ;

	} ;

	Graph.prototype.edges = function* ( ) {

		for ( let e of this.eitr( ) ) yield [ e.u , e.v , e ] ;

	} ;

	Graph.prototype.incident = function* ( u ) {

		yield* this.ingoing( u ) ;
		yield* this.outgoing( u ) ;

	} ;

	Graph.prototype.ingoing = function* ( u ) {

		for ( let e of this.initr( u ) ) yield [ e.u , e.v , e ] ;

	} ;

	Graph.prototype.outgoing = function* ( u ) {

		for ( let e of this.outitr( u ) ) yield [ e.u , e.v , e ] ;

	} ;


	Graph.prototype.endpoints = function ( e ) {

		return [ e.u , e.v ] ;

	} ;


	/**
	 * O(1)
	 */
	Graph.prototype.reverse = function ( ) {

		[ this.succ , this.pred ] = [ this.pred , this.succ ] ;

		return this ;

	} ;

	return Graph ;

} ;

exports.MultiDiGraph = MultiDiGraph ;