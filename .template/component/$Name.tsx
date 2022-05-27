import React from "react";

<%if($Styles){%>import styles from "./<%=$Name%>.module.scss";

<%}%>interface I<%=$Name%>Props {
	// TODO: Add props here
}

export const  <%=$Name%>:React.FC<I<%=$Name%>Props> = (props: I<%=$Name%>Props) => {
  return <div<%if($Styles){%> className={styles.<%=$Name%>}<%}%>><%=$Name%></div>;
}
