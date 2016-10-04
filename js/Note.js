var Note = React.createClass({
	getInitialState: function() {
		return {editing: false};
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
			<div className ="note">
				<textarea className="form-control" ref="newText" defaultValue={this.props.children}>
				</textarea>
				<button onClick={this.save} className="btn btn-success glyphicon glyphicon-check"/>
			</div>
		);	
	},

	renderDisplay: function() {
		return (
			<div className ="note">
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
			if (this.props[propName] > 100) {
				return new Error("Creating " + props[propName] + "notes is way too much!")
			}
		}

	},

	getInitialState: function() {
		return {
			notes: [
				'note1',
				'note2',
				'note3'
			]
		}
	},

	update: function(newText, i) {
		var arr = this.state.notes;
		arr[i] = newText;
		this.setState({notes: arr});
	},

	delete: function(i) {
		var arr = this.state.notes;
		arr.splice(i,0);
		this.setState({notes: arr});
	},
	eachNote: function(note, i) {
		return (
			<Note 
				key={i}
				index={i}
				onChange={this.update}
				onRemove={this.delete}
			>{note}</Note>
		);
	},
	render: function() {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)};
			</div>
		);
	}
});

React.render(<Board count={10}>Hello</Board>, document.getElementById('react-container'));