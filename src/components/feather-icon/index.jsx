import { defineComponent, watch } from "vue";
import "./index.css";
const FeacherIcon = defineComponent({
	props: {
		icon: Object,
		color: String,
	},
	emits: ["success-click"],
	setup(props, { emit }) {
		const getIcon = (e, name) => {
			var el = document.getElementById("copy-text");
			el.value = name;
			el.select();
			document.execCommand("copy");
			emit("success-click", name);
			const message = document.createElement("div");
			message.innerHTML = "Copy successfully";
			message.setAttribute(
				"style",
				"position:fixed;top:" +
					(e.y + 1) +
					"px;left:" +
					(e.x + 1) +
					"px;opacity:0;transition:all .5s;background: white;height:0px;overflow:hidden;padding:4px 12px;border-radius:4px;"
			);
			document.body.append(message);
			setTimeout(() => {
				message.style.height = "20px";
        message.style.opacity = '1';
			});

			setTimeout(() => {
        setTimeout(()=> {
          document.body.removeChild(message);
        },500)
				message.style.height = "0px";
        message.style.opacity = '0';
			}, 1000);
		};
		return () => (
			<div class="icon-item">
				<div
					class="icon-detail"
					style={"background:" + props.color}
					onClick={(e) => getIcon(e, props.icon.name)}
					title={"Click copy " + props.icon.name}
				>
					<svg
						{...props.icon.attrs}
						color={
							props.color === "#fadb14" || props.color === "white"
								? "black"
								: "white"
						}
						v-html={props.icon.contents}
					></svg>
				</div>
				<p>{props.icon.name}</p>
			</div>
		);
	},
});

export default FeacherIcon;
