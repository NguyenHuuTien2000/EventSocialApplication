import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { router } from "../../../app/router/Routes";

export default function ActivitySearchBar() {
  const {activityStore: { setPredicate }} = useStore();
  const [keyword, setKeyword] = useState("");

  const handleType = (event: any) => {
    setKeyword(event.target.value)
  }

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      if (window.location.pathname !== "/activities") {
        router.navigate("/activities")
      }
      setPredicate("keyword", keyword)
    }
  }

  const handleClear = () => {
    setPredicate("keyword", "")
    setKeyword("")
  }

  return (
    <div className="ui icon input search-bar">
      <input
        value={keyword}
        onChange={(e) => handleType(e)}
        onKeyDown={(e) => handleSearch(e)}
        type="text"
        placeholder="Search for events..."
        maxLength={50}
      />
      <i onClick={(event) => keyword.length > 0 ? handleClear() : setPredicate("keyword", keyword)} className={keyword.length > 0 ? "close icon" : "search icon"} />
    </div>
  )
}
