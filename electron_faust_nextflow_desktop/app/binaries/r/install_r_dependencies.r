#!/usr/bin/env Rscript

# Taken from here
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

source("install_r_biocmanager_dependencies.r")
source("install_r_cran_dependencies.r")
source("install_r_github_dependencies.r")

cran_packages_to_install <- list(
    # For FAUST_Tools
    list("assertthat", NA),
    list("backports", NA),
    list("BiocManager", NA),
    list("bitops", NA),
    list("broom", NA),
    list("callr", NA),
    list("caTools", NA),
    list("cellranger", NA),
    list("cli", NA),
    list("cowplot", NA),
    list("crayon", NA),
    list("crosstalk", NA),
    list("DBI", NA),
    list("dendextend", NA),
    list("desc", NA),
    list("devtools", NA),
    list("digest", NA),
    list("dbplyr", NA),
    list("dplyr", NA),
    list("DT", NA),
    list("ellipsis", NA),
    list("fansi", NA),
    list("fastmap", NA),
    list("forcats", NA),
    list("foreach", NA),
    list("fs", NA),
    list("gclus", NA),
    list("gdata", NA),
    list("generics", NA),
    list("ggplot2", NA),
    list("ggplotify", NA),
    list("gplots", NA),
    list("gridExtra", NA),
    list("gridGraphics", NA),
    list("gtable", NA),
    list("gtools", NA),
    list("haven", NA),
    list("heatmaply", NA),
    list("hms", NA),
    list("htmltools", NA),
    list("htmlwidgets", NA),
    list("httpuv", NA),
    list("httr", NA),
    list("iterators", NA),
    list("jsonlite", NA),
    list("later", NA),
    list("lazyeval", NA),
    list("lubridate", NA),
    list("magrittr", NA),
    list("memoise", NA),
    list("mime", NA),
    list("modelr", NA),
    list("pillar", NA),
    list("pkgbuild", NA),
    list("pkgconfig", NA),
    list("pkgload", NA),
    list("plotly", NA),
    list("prettyunits", NA),
    list("processx", NA),
    list("promises", NA),
    list("ps", NA),
    list("purrr", NA),
    list("R6", NA),
    list("rChoiceDialogs", NA),
    list("readr", NA),
    list("readxl", NA),
    list("remotes", NA),
    list("reprex", NA),
    list("Rcpp", NA),
    list("registry", NA),
    list("rJava", NA),
    list("rlang", NA),
    list("rprojroot", NA),
    list("rstudioapi", NA),
    list("rvcheck", NA),
    list("rvest", NA),
    list("seriation", NA),
    list("sessioninfo", NA),
    list("shiny", NA),
    list("shinyalert", NA),
    list("shinycssloaders", NA),
    list("shinyjs", NA),
    list("shinyFiles", NA),
    list("shinyWidgets", NA),
    list("tibble", NA),
    list("tidyr", NA),
    list("tidyselect", NA),
    list("tidyverse", NA),
    list("TSP", NA),
    list("usethis", NA),
    list("vctrs", NA),
    list("viridis", NA),
    list("webshot", NA),
    list("withr", NA),
    list("xtable", NA),
    list("xml2", NA),
    list("yaml", NA)
    # # For FAUST_Desktop_Application's electron execution
    # list("backports", NA),
    # list("here", NA),
    # list("rprojroot", NA)

)

bioc_packages_to_install <- list(
    # list("flowCore", NA),
    # list("flowWorkspace", NA)
)

github_packages_to_install <- c(
    list("RGLab/RProtoBufLib", NA),
    list("RGLab/flowCore", NA),
    list("RGLab/flowWorkspace", NA)
)

# TODO: Convert type to be enum
if (dir.exists("r-mac")) {
    print("==================================================================");
    print("Installing OSX - CRAN dependencies")
    print("==================================================================");
    installCranDependencies(cran_packages = cran_packages_to_install,
                            library_path = file.path("r-mac", "library"),
                            type = "mac.binary.el-capitan",
                            decompress = untar)
    print("==================================================================");
    print("Installing OSX - BiocManager dependencies")
    print("==================================================================");
    # installBiocmanagerDependencies(packages = bioc_packages_to_install,
    #                                library_path = file.path("r-mac", "library"),
    #                                type = "mac.binary.el-capitan",
    #                                decompress = untar)
    print("==================================================================");
    print("Installing OSX - GitHub dependencies")
    print("==================================================================");
    installGitHubDependencies(github_packages = github_packages_to_install,
                              library_path = file.path("r-mac", "library"),
                              type = "mac.binary.el-capitan",
                              decompress = untar)
}

if (dir.exists("r-win")) {
    print("==================================================================");
    print("Installing Windows Specific Dependencies")
    print("==================================================================");
    print("Installing required CRAN dependencies")
    installCranDependencies(cran_packages = cran_packages_to_install,
                            library_path = file.path("r-win", "library"),
                            type = "win.binary",
                            decompress = unzip)
    print("==================================================================");
    print("Installing OSX - BiocManager dependencies")
    print("==================================================================");
    # Install bioc dependencies
    print("==================================================================");
    print("Installing OSX - GitHub dependencies")
    print("==================================================================");
    # Install github dependencies
}
