(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

	class boton extends HTMLElement {
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
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("IsActive" in changedProperties) {
				console.log(`${this._props["IsActive"]}`);
				if ( changedProperties["IsActive"] == 0 )
				{
			        this.style["background-color"] = this._props["colorinactive"];
				}
				else
				{
				this.style["background-color"] = this._props["coloractive"];
				}
			}
			
			if ("colorinactive" in changedProperties) {
				this.style["background-color"] = changedProperties["colorinactive"];
			}

			
		}
	}

	customElements.define("com-sample-boton", boton);
})();
