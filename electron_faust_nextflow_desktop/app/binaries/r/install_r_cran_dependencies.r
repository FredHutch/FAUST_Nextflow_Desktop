#!/usr/bin/env Rscript

# Taken from here
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

# Script to find dependencies of a pkg list, download binaries and put them
# In the standalone R library.

# options(repos = "https://cloud.r-project.org")
default_cran_repo_url = "https://cloud.r-project.org"

default_directories_to_remove <- c("help",
                                   "doc",
                                   "tests",
                                   "html",
                                   "include",
                                   "unitTests",
                                   file.path("libs", "*dSYM"))

install_cran_dependencies <- function(cran_packages,
                                      library_path,
                                      type,
                                      decompress,
                                      remove_dirs = default_directories_to_remove) {
    if (!length(cran_packages)) {
        stop("No cran packages were specified to install")
    }

    previously_installed_libraries <- list.files(library_path)
    cran_to_install <- setdiff(cran_packages,
                               previously_installed_libraries)
    if (length(cran_to_install) == 0) {
        print("All CRAN packages have been already been installed")
        return(NA)
    }

    temporary_download_directory <- tempdir()
    downloaded <- download.packages(cran_to_install,
                                    destdir = temporary_download_directory,
                                    repo = default_cran_repo_url,
                                    type = type,
                                    )
    apply(downloaded, 1, function(x) decompress(x[2], exdir = library_path))
    unlink(downloaded[, 2])

    z <- lapply(
        list.dirs(library_path, full.names = TRUE, recursive = FALSE),
        function(x) {
            unlink(file.path(x, remove_dirs), force = TRUE, recursive = TRUE)
        }
    )
    invisible(NULL)
}