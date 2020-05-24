'use strict';

$(function () {
	$("input[type='password'][data-eye]").each(function (i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-' + i,
		}).css({
			position: 'absolute',
			right: 10,
			top: ($this.outerHeight() / 2) - 12,
			padding: '2px 7px',
			fontSize: 12,
			cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if (invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function () {
			$("#passeye-" + i).val($(this).val());
		});
		$("#passeye-toggle-" + i).on("click", function () {
			if ($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			} else {
				$this.attr('type', 'text');
				$this.val($("#passeye-" + i).val());
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function () {
		var form = $(this);
		var re = "";

		if (form[0].username.value == "") {
			alert("Error: Username cannot be blank!");
			form[0].username.focus();
			return false;
		}
		if ($('#invuser').attr('invalid_username') === "true") {
			alert("Error: Username is already taken.");
			form[0].username.focus();
			return false;
		}
		re = /^\w+$/;
		if (!re.test(form[0].username.value)) {
			alert("Error: Username must contain only letters, numbers and underscores!");
			$("#username").addClass('is-invalid');
			form[0].username.focus();
			return false;
		}
		if (form[0].typeof.value == "register") {

			if (form[0].password.value != "" && form[0].password.value == form[0].confirm_password.value) {
				if (form[0].email.value == "") {
					$("#email").addClass('is-invalid');
					return false;
				} else {
					var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
					if (regMail.test($("#email").val()) == false) {
						$("#email").addClass('is-invalid');
						return false;
					} else {
						$("#email").removeClass('is-invalid');
					}

				}
				if (form[0].password.value.length < 6) {
					alert("Error: Password must contain at least six characters!");
					form[0].password.focus();
					return false;
				}
				if (form[0].password.value == form[0].username.value) {
					alert("Error: Password must be different from Username!");
					form[0].password.focus();
					return false;
				}
				re = /[0-9]/;
				if (!re.test(form[0].password.value)) {
					alert("Error: password must contain at least one number (0-9)!");
					form[0].password.focus();
					return false;
				}
				re = /[a-z]/;
				if (!re.test(form[0].password.value)) {
					alert("Error: password must contain at least one lowercase letter (a-z)!");
					form[0].password.focus();
					return false;
				}
				re = /[A-Z]/;
				if (!re.test(form[0].password.value)) {
					alert("Error: password must contain at least one uppercase letter (A-Z)!");
					form[0].password.focus();
					return false;
				}
			} else {
				alert("Error: Please check that you've entered and confirmed your password!");
				$("#confirm_password").addClass('is-invalid');
				form[0].password.focus();
				return false;
			}
		}
		if (form[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.addClass('was-validated');
		return true;
	});
});
