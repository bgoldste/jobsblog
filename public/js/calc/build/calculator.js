var formatMoney = function (value) {
	return numeral(value).format('$0,0.00');
};

var OutputGroup = React.createClass({
	displayName: "OutputGroup",

	calculateEquity: function () {
		var val = this.props.eqPercentage / 100 * this.props.coValuation;
		return val;
	},
	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				null,
				"You have ",
				this.props.eqPercentage,
				"% Equity. The company is currently worth ",
				formatMoney(this.props.coValuation),
				"."
			),
			React.createElement(
				"p",
				null,
				"That means your current equity is worth ",
				formatMoney(this.calculateEquity())
			),
			React.createElement(
				"p",
				null,
				"If the company 10x's, your equity will be worth ",
				formatMoney(this.calculateEquity() * 10)
			)
		);
	}
});

var InputGroup = React.createClass({
	displayName: "InputGroup",

	handleChange: function () {
		console.log(this.props);
		this.props.onUserInput(this.refs.eqPercentageInput.value, this.refs.coValuationInput.value);
	},
	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				null,
				React.createElement("input", {
					type: "number",
					placeholder: "Enter your Equity %",
					value: this.props.eqPercentage,
					ref: "eqPercentageInput",
					onChange: this.handleChange
				}),
				React.createElement("input", {
					type: "number",
					placeholder: "Enter your Company Valuation ",
					value: this.props.coValuation,
					ref: "coValuationInput",
					onChange: this.handleChange
				})
			)
		);
	}
});

var Calculator = React.createClass({
	displayName: "Calculator",

	getInitialState: function () {
		return {
			eqPercentage: 0.1,
			coValuation: 10000000
		};
	},
	handleUserInput: function (eqPercentage, coValuation) {
		this.setState({
			eqPercentage: eqPercentage,
			coValuation: coValuation
		});
	},
	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				" Calculator "
			),
			React.createElement(InputGroup, {
				eqPercentage: this.state.eqPercentage,
				coValuation: this.state.coValuation,
				onUserInput: this.handleUserInput
			}),
			React.createElement(OutputGroup, {
				eqPercentage: this.state.eqPercentage,
				coValuation: this.state.coValuation
			})
		);
	}
});

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('container'));