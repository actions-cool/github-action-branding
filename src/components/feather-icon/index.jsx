import { defineComponent } from "vue";
import "./index.css";
import { getIcon } from "./../../utils";
const FeacherIcon = defineComponent({
	props: {
		icon: Object,
		color: String,
	},
	emits: ["success-click"],
	setup(props, { emit }) {
		return () => (
			<div class="icon-item">
				<div
					class="icon-detail"
					style={"background:" + props.color}
					onClick={(e) =>
						getIcon(e, props.icon.name, 'Copied',  () => {
							emit("success-click", props.icon.name);
						})
					}
					title={"Click copy " + props.icon.name}
				>
					<svg
						{...props.icon.attrs}
						color={
							props.color === "#ffd33d" || props.color === "white"
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
