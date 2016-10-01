var Note = React.createClass({
	edit: function() {
		alert('editing');
	},
	trash: function() {
		alert('trash');
	},
	render: function() {
		return (
			<div className ="note">
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-edit"/>
					<button onClick={this.trash} className="btn btn-danger glyphicon glyphicon-trash"/>
				</span>
			</div>);
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

	render: function() {
		return (
			<div className="board">
			{this.props.count}
			</div>
			);
	}
});

React.render(<Board count={10}>Hello</Board>, document.getElementById('react-container'));