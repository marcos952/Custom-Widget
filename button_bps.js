(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Box Properties</legend>
				<table>
					<tr>
						<td>Color Inactive</td>
						<td><input id="color_inactive" type="text" size="5" maxlength="10"></td>
					</tr>
					<tr>
						<td>Color Active</td>
						<td><input id="color_active" type="text" size="5" maxlength="10"></td>
					</tr>
					<tr>
						<td>Text in the button</td>
						<td><input id="description" type="text" size="5" maxlength="10"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>


		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class botonbps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							colorinactive: this.colorinactive,
							coloractive: this.coloractive,
							description: this.description
						}
					}
			}));
		}

		set colorinactive(newColor) {
			this._shadowRoot.getElementById("color_inactive").value = newColor;
		}

		get colorinactive() {
			return this._shadowRoot.getElementById("color_inactive").value;
		}
		set coloractive(newColor) {
			this._shadowRoot.getElementById("color_active").value = newColor;
		}

		get coloractive() {
			return this._shadowRoot.getElementById("color_active").value;
		}
		set description(newDescription) {
			this._shadowRoot.getElementById("description").value = newDescription;
		}

		get description() {
			return this._shadowRoot.getElementById("description").value;
		}
		
		
		
	}

	customElements.define("com-sample-boton-bps", botonbps);
})();
