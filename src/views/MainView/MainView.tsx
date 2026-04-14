import ImagesPaginated from "../../components/GlobalComponents/ImagesPaginated/ImagesPaginated";
import { useState } from "react";
import SelectImages from "../../components/GlobalComponents/SelectImages/SelectImages";

function MainView() {
  const [selectMode, setSelectMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectMode = () => setSelectMode((prev) => !prev);
  const toggleSelectAll = () => setSelectAll((prev) => !prev);

  return (
    <main>
      <div className="view-title">
        {!selectMode && <h1>Ваши изображения</h1>}
        <SelectImages
          select={selectMode}
          selectAll={selectAll}
          toggleSelect={toggleSelectMode}
          toggleSelectAll={toggleSelectAll}
        />
      </div>
      <ImagesPaginated select={selectMode} selectAll={selectAll} />
    </main>
  );
}

export default MainView;
