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

React.render(<Note>Hello</Note>, document.getElementById('react-container'));