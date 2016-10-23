var Note = React.createClass({

	getInitialState: function() {
		return {editing: false};
	},

	componentWillMount: function() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150) + 'px',
			top: this.randomBetween(0, window.innerHeight - 150) + 'px',
			transform: 'rotate(' + this.randomBetween(-15,15) + 'deg)'
		};
	},

	componentDidMount: function(){
		$(this.getDOMNode()).draggable();
	},

	randomBetween: function(min, max) {
		return min + Math.ceil(Math.random() * max);
	},

	save: function() {
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},

	edit: function() {
		this.setState({editing: true});
	},

	trash: function() {
		this.props.onRemove(this.props.index);
	},

	renderForm: function() {
		return (
			<div className ="note" style={this.style} >
				<textarea className="form-control" ref="newText" defaultValue={this.props.children}>
				</textarea>
				<button onClick={this.save} className="btn btn-success glyphicon glyphicon-check"/>
			</div>
		);	
	},

	renderDisplay: function() {
		return (
			<div className ="note" style={this.style}>
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-edit"/>
					<button onClick={this.trash} className="btn btn-danger glyphicon glyphicon-trash"/>
				</span>
			</div>
		);
	},

	render: function() {
		if (this.state.editing == true) {
			return this.renderForm();
		}
		else {
			return this.renderDisplay();

		}
	}
});

var Board = React.createClass({
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number" ) {
				return new Error("Count must be a number!");
			}
			if (props[propName] > 100) {
				return new Error("Creating " + props[propName] + "notes is way too much!")
			}
		}

	},

	getInitialState: function() {
		return {
			notes: []
		};
	},

	nextId: function() {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},

	componentWillMount: function(){
		var self = this;
		if (this.props.count) {
			$.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" + 
				this.props.count + "&start-with-lorum=1&callback=?", function(results){
					results[0].split('. ').forEach(function(sentence){
						self.addNote(sentence.substring(0, 30))
					});
			});
		}
	},

	addNote: function(text) {
		var arr = this.state.notes;
		arr.push({
			id: this.nextId(),
			note: text
		});
		this.setState({notes: arr});
	}, 

	update: function(newText, i) {
		var arr = this.state.notes;
		arr[i].note = newText;
		this.setState({notes: arr});
	},

	delete: function(i) {
		var arr = this.state.notes;
		arr.splice(i,1);
		this.setState({notes: arr});
	},

	eachNote: function(note, i) {
		return (
			<Note 
				key={note.id}
				index={i}
				onChange={this.update}
				onRemove={this.delete}
			>{note.note}</Note>
		);
	},
	
	render: function() {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={this.addNote.bind(null, 'New Note')} className="btn btn-success glyphicon glyphicon-plus"/>
			</div>
		);
	}
});

React.render(<Board count={10}/>, document.getElementById('react-container'));