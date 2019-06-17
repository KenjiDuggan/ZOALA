var Zoas = React.createClass({
    getInitialState: function(){
        return({
            zoas: []
        });
    },
    render: function(){
        var zoas = this.state.zoas;
        zoas = zoas.map(function(zoa, index){
            return(
                <li key={index}>
                    <span className={zoa.obj.available}></span>
                    <span className="name">{zoa.obj.name}</span>
                    <span className="rank">{zoa.obj.function}</span>
                </li>
            );
        });
        return(
            <div id="zoa-container">
                <form id="search" onSubmit={this.handleSubmit}>
                    <label>Enter your name:</label>
                    <input type="text" ref="name" placeholder="name" required />
                    <input type="submit" value="Find zoas" />
                </form>
                <ul>{zoas}</ul>
            </div>
        );
    },
    handleSubmit: function(e){
        e.preventDefault();
        var name = this.refs.name.value;
        fetch('/api/zoas?name=' + name).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                zoas: json
            });
            console.log(json);
        });
    }
});
ReactDOM.render(<zoas />, document.getElementById('zoas'));
