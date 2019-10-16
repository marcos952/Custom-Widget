(function() { 
	let template = document.createElement("template");
	template.id = 'id_template';
	template.innerHTML = `
		<input id="button_t" type="button" value="pepe" style="width:96px; height: 32px;" >
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
			console.log(`${this._props["description"]}`);
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
			if ("description" in changedProperties) {
				document.getElementById("button_t").value = changedProperties["description"];
				/*value(changedProperties["description"]);*/
			}
			console.log(`${this._props["description"]}`);
		}
	}

	customElements.define("com-sample-box", Box);
})();
