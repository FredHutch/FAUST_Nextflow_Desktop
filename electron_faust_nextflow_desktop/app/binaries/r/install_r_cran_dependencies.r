# Heavily edited from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

# Script to find dependencies of a pkg list, download binaries and put them
# In the standalone R library.

default_cran_repo_url <- "https://cloud.r-project.org"

default_package_directories_to_remove <- c(
    "help",
    "doc",
    "tests",
    "html",
    "include",
    "unitTests",
    file.path("libs", "*dSYM")
)

installCranDependencies <- function(packages,
                                    library_path,
                                    type,
                                    decompress,
                                    remove_dirs = default_package_directories_to_remove) {
    if (!length(packages)) {
        print("No cran packages were specified to install")
        return(NA)
    }

    previously_installed_packages <- list.files(library_path)
    requested_packages_to_install <- lapply(packages,
                                            FUN = function(x) x[[1]])
    requested_packages_to_install <- unlist(requested_packages_to_install)
    detected_packages_to_install <- setdiff(requested_packages_to_install,
                                            previously_installed_packages)
    selected_packages_to_install <- packages[!(requested_packages_to_install %in% previously_installed_packages)]
    print("-------------------------")
    print(paste0("previously_installed_packages: ", previously_installed_packages))
    print(paste0("requested_packages_to_install: ", requested_packages_to_install))
    print(paste0("detected_packages_to_install: ", detected_packages_to_install))
    print(paste0("selected_packages_to_install: ", selected_packages_to_install))

    if (length(selected_packages_to_install) == 0) {
        print("All CRAN packages have been already been installed")
        return(NA)
    }

    for (package_to_install in selected_packages_to_install) {
        # print("-------------------------")
        package_name <- package_to_install[[1]]
        package_version <- package_to_install[[2]]
        print(package_name)
        print(package_version)
        if (is.na(package_version)) {
            install.packages(package_name, 
                             lib = library_path,
                             # dependencies = TRUE,
                             repos = default_cran_repo_url)
        }
        else {
            install.packages(package_name,
                             lib = library_path,
                             # dependencies = TRUE,
                             repos = default_cran_repo_url,
                             version = package_version
            )
        }
    }
}
