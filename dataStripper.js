rowData.forEach(row => {
	row.values.forEach(value => {
		if (value.userEnteredFormat) delete value.userEnteredFormat;
		if (value.userEnteredValue) delete value.userEnteredValue;
		if (value.effectiveValue) delete value.effectiveValue;
		if (value.horizontalAlignment) delete value.horizontalAlignment;
		if (value.verticalAlignment) delete value.verticalAlignment;
		if (value.wrapStrategy) delete value.wrapStrategy;
		if (value.textFormat) delete value.textFormat;

		if (value.effectiveFormat) {
			if (value.effectiveFormat.borders) delete value.effectiveFormat.borders;
			if (value.effectiveFormat.padding) delete value.effectiveFormat.padding;
			if (value.effectiveFormat.horizontalAlignment)
				delete value.effectiveFormat.horizontalAlignment;

			if (value.effectiveFormat.verticalAlignment)
				delete value.effectiveFormat.verticalAlignment;
			if (value.effectiveFormat.wrapStrategy)
				delete value.effectiveFormat.wrapStrategy;
			if (value.effectiveFormat.textFormat)
				delete value.effectiveFormat.textFormat;
			if (value.effectiveFormat.hyperlinkDisplayType)
				delete value.effectiveFormat.hyperlinkDisplayType;
			if (value.effectiveFormat.backgroundColorStyle)
				delete value.effectiveFormat.backgroundColorStyle;
		}
	});
});
console.log(JSON.stringify(rowData));
