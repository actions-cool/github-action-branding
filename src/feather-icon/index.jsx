import { defineComponent } from "vue";
import "./index.less";
import { getIcon } from "../utils";
const FeacherIcon = defineComponent({
	props: {
		icon: Object,
		color: [Array, String],
	},
	emits: ["success-click"],
	setup(props, { emit }) {
		return () => (
			<div class="icon-item">
				<div
					class="icon-detail"
					style={"background:" + (props.color instanceof Array ? props.color[1] : props.color)}
					onClick={(e) =>
						getIcon(e, props.icon.name, 'Copied',  () => {
							emit("success-click", props.icon.name,  props.color);
						})
					}
					title={"Click copy " + props.icon.name}
				>
					<svg
						{...props.icon.attrs}
						color={
							props.color.includes("#ffd33d") || props.color.includes("white")
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
