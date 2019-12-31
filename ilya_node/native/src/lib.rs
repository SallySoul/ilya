extern crate neon;

use neon::prelude::*;
use std::collections::HashMap;

pub struct StaticAssetMap {
    static_assets: HashMap<String, &'static str>,
}

impl StaticAssetMap {
    fn new() -> StaticAssetMap {
        let mut result = StaticAssetMap {
            static_assets: HashMap::new(),
        };
        result.static_assets.insert(
            "layout.svg".to_owned(),
            include_str!("../../static_assets/layout.svg"),
        );
        result.static_assets.insert("test".to_owned(), "test");
        result
    }
}

declare_types! {
    pub class JsStaticAssetMap for StaticAssetMap {
        init(_) {
            Ok(StaticAssetMap::new())
        }

        method get(mut cx) {
            let name = cx.argument::<JsString>(0)?.value();
            let this = cx.this();
            let result = {
                let guard = cx.lock();
                let asset_map = this.borrow(&guard);
                asset_map.static_assets[&name]
            };

            Ok(cx.string(&result).upcast())
        }
    }
}

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

register_module!(mut module_context, {
    module_context.export_function("hello", hello)?;
    module_context.export_class::<JsStaticAssetMap>("StaticAssetMap")
});
