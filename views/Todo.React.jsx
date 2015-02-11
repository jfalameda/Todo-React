/**
 * @jsx React.DOM
 */

var Todo = React.createClass({
    getInitialState: function () {
        return { items: this.props.initialItems };
    },
    onAddedItem: function (name) {
        var items = this.state.items.push(
            Immutable.Map({
                Name: name
            })
        );
        this.setState({ items: items });
    },
    render: function () {
        return <div> <h1>React todo list</h1>
            <TodoForm onAddedItem={this.onAddedItem} />
            <List items={this.state.items} />
        </div>;
    }
});

var TodoForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        return {
            name: ''
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var name = this.state.name;
        this.props.onAddedItem(name);
    },
    render: function () {
        return <form onSubmit={this.handleSubmit} >
            <input ref="name" type="text" valueLink={this.linkState('name')} />
            <input type="submit"/>
        </form>;
    }
});

var List = React.createClass({
    render: function() {
        var items = this.props.items.map( function(item) { return  <ListItem item={item} /> }).toArray();
        return <ul>{items}</ul>;
    }
});

var ListItem = React.createClass({
    shouldComponentUpdate: function(nextProp, nextState) {
        return nextProp.item != this.props.item;
    },
    render: function() {
        return <li>{this.props.item.get('Name')}</li>;
    }
})
