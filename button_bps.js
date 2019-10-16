(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Box Properties</legend>
				<table>
					<tr>
						<td>Opacity</td>
						<td><input id="bps_opacity" type="text" size="5" maxlength="5"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
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
							opacity: this.opacity
						}
					}
			}));
		}

		set opacity(newOpacity) {
			this._shadowRoot.getElementById("bps_opacity").value = newOpacity;
		}

		get opacity() {
			return this._shadowRoot.getElementById("bps_opacity").value;
		}
	}

	customElements.define("com-sample-boton-bps", botonbps);
})();